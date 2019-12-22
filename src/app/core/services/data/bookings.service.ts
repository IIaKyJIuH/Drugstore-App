import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { BookingDto } from '../dtos/bookings/booking-dto';
import { MedicineDto } from '../dtos/medicines/medicine-dto';
import { BookingModel } from '../models/bookings/booking-model';
import { MedicineModel } from '../models/medicines/medicine-model';
import { ArchiveService } from './archive.service';
import { ProjectFunctions } from './project-functions';
import { StatisticsService } from './statistics.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  /**
   * For easier interacting in app.
   * @param dtoArr - dto bookings from db.
   */
  private static mapDtoArrayToModelArray(dtoArr: BookingDto[]): BookingModel[] {
    const resultModelArr: BookingModel[] = [];
    for (const dto of dtoArr) {
      const itemsModel = [];
      for (const item of dto.items) {
        itemsModel.push(new MedicineModel({
          amount: item.count,
          name: item.term
        }))
      }
      resultModelArr.push(new BookingModel({
        email: dto.email,
        medicines: itemsModel,
        key: dto.key
      }));
    }
    return resultModelArr;
  }

  /**
   * .ctor
   * @param database - for interacting with firebase db.
   * @param archiveService - for storing info about transactions into db archive..
   * @param authService - for getting user auth info.
   * @param statisticsService - for storing info about transactions into db statistics.
   */
  constructor(
    private database: AngularFireDatabase,
    private archiveService: ArchiveService,
    private authService: AuthenticationService,
    private statisticsService: StatisticsService,
  ) { }

  /**
   * Gets all bookings from db.
   */
  getAllBookings(): Observable<BookingModel[]> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((records: object) => {
        const arr = ProjectFunctions.mapObjectToArray(records);
        return BookingsService.mapDtoArrayToModelArray(arr);
      }),
    );
  }

  /**
   * Gets all bookings corresponding to the current user.
   */
  getCurrentUserBookings(): Observable<BookingModel[]> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((records: object) => {
        const currentEmail = this.authService.getUserData().email;
        const arr = ProjectFunctions.mapObjectToArrayForUser(records, currentEmail);
        return BookingsService.mapDtoArrayToModelArray(arr);
      })
    );
  }

  /**
   * Records this transaction as successful in db.
   * @param transaction - to be saved.
   */
  setToSuccessfulTransaction(transaction: BookingModel): void {
    this.database.object(`/bookings/users/${transaction.key}`).valueChanges()
      .pipe(
        take(1),
        tap((record: BookingDto) => {
          this.recordTransactionByOperation(Operation.Success, transaction);
        })
      ).subscribe();
  }

  /**
   * Records this transaction as failed in db.
   * @param transaction - to be saved.
   */
  setToFailedTransaction(transaction: BookingModel): void {
    this.database.object(`/bookings/users/${transaction.key}`).valueChanges()
    .pipe(
      take(1),
      tap((record: BookingDto) => {
        this.recordTransactionByOperation(Operation.Fail, transaction);
      })
    ).subscribe();
  }

  /**
   * Records this transaction as cancelled in db.
   * @param booking - to be saved.
   */
  cancelBooking(booking: BookingModel): void {
    this.database.object(`/bookings/users/${booking.key}`).valueChanges()
      .pipe(
        take(1),
        tap((record: BookingDto) => {
         this.recordTransactionByOperation(Operation.Cancel, booking);
        })
      ).subscribe();
  }

  /**
   * Subtracts medicines from db and pushes new booking.
   * @param medicines - to be booked.
   */
  bookMedicines(medicines: MedicineModel[]): void {
    const currentEmail = this.authService.getUserData().email;
    const medicinesDto: MedicineDto[] = [];
    for (const medicine of medicines) {
      medicinesDto.push({
        term: medicine.name,
        count: medicine.amount
      })
    }
    this.database.list('/bookings/users/').push({ email: currentEmail, items: medicinesDto } as BookingDto);
    this.subMedicinesFromDb(medicines);
  }

  /**
   * Do some actions to store info about transaction in db.
   * @param operation - alias to transaction status.
   * @param transaction - to be saved.
   */
  private recordTransactionByOperation(operation: Operation, transaction: BookingModel): void {
    switch (operation) {
      case Operation.Success:
        this.archiveService.writeSuccessfulTransaction(transaction);
        this.statisticsService.writeSuccessfulTransaction(transaction);
        this.database.object(`/bookings/users/${transaction.key}`).remove();
        break;
      case Operation.Fail:
        this.archiveService.writeFailedTransaction(transaction);
        this.statisticsService.writeFailedTransaction(transaction);
        this.database.object(`/bookings/users/${transaction.key}`).remove();
        break;
      case Operation.Cancel:
        this.restoreMedicinesToDb(transaction.medicines);
        this.archiveService.writeCancelledBooking(transaction);
        this.statisticsService.writeCancelledBooking(transaction);
        this.database.object(`/bookings/users/${transaction.key}`).remove();
        break;
    }
  }

  /**
   * Subtract medicines from db medicines list.
   * @param medicines - are booked.
   */
  private subMedicinesFromDb(medicines: MedicineModel[]): void {
    for (const medicine of medicines) {
      this.database.object(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}`).valueChanges()
        .pipe(
          take(1),
          tap((tapMedicine: MedicineDto) => {
            this.database.object(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}/count`).set(tapMedicine.count - medicine.amount);
          })
        ).subscribe();
    }
  }

  /**
   * Restores medicines to db from cancelled booking.
   * @param medicines - to be restored.
   */
  private restoreMedicinesToDb(medicines: MedicineModel[]): void {
    for (const medicine of medicines) {
      this.database.object(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}`).valueChanges()
        .pipe(
          take(1),
          tap((tapMedicine: MedicineDto) => {
            this.database.object(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}/count`).set(tapMedicine.count + medicine.amount);
          })
        ).subscribe();
    }
  }

}

/**
 * For easier visibility of method action above.
 */
enum Operation {
  Success,
  Fail,
  Cancel,
}
