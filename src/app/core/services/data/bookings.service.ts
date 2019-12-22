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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For easier interacting in app.
 ***REMOVED*****REMOVED*** @param dtoArr - dto bookings from db.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param database - for interacting with firebase db.
 ***REMOVED*****REMOVED*** @param archiveService - for storing info about transactions into db archive..
 ***REMOVED*****REMOVED*** @param authService - for getting user auth info.
 ***REMOVED*****REMOVED*** @param statisticsService - for storing info about transactions into db statistics.
 ***REMOVED*****REMOVED***/
  constructor(
    private database: AngularFireDatabase,
    private archiveService: ArchiveService,
    private authService: AuthenticationService,
    private statisticsService: StatisticsService,
  ) { }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Gets all bookings from db.
 ***REMOVED*****REMOVED***/
  getAllBookings(): Observable<BookingModel[]> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((records: object) => {
        const arr = ProjectFunctions.mapObjectToArray(records);
        return BookingsService.mapDtoArrayToModelArray(arr);
      }),
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Gets all bookings corresponding to the current user.
 ***REMOVED*****REMOVED***/
  getCurrentUserBookings(): Observable<BookingModel[]> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((records: object) => {
        const currentEmail = this.authService.getUserData().email;
        const arr = ProjectFunctions.mapObjectToArrayForUser(records, currentEmail);
        return BookingsService.mapDtoArrayToModelArray(arr);
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Records this transaction as successful in db.
 ***REMOVED*****REMOVED*** @param transaction - to be saved.
 ***REMOVED*****REMOVED***/
  setToSuccessfulTransaction(transaction: BookingModel): void {
    this.database.object(`/bookings/users/${transaction.key}`).valueChanges()
      .pipe(
        take(1),
        tap((record: BookingDto) => {
          this.recordTransactionByOperation(Operation.Success, transaction);
        })
      ).subscribe();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Records this transaction as failed in db.
 ***REMOVED*****REMOVED*** @param transaction - to be saved.
 ***REMOVED*****REMOVED***/
  setToFailedTransaction(transaction: BookingModel): void {
    this.database.object(`/bookings/users/${transaction.key}`).valueChanges()
    .pipe(
      take(1),
      tap((record: BookingDto) => {
        this.recordTransactionByOperation(Operation.Fail, transaction);
      })
    ).subscribe();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Records this transaction as cancelled in db.
 ***REMOVED*****REMOVED*** @param booking - to be saved.
 ***REMOVED*****REMOVED***/
  cancelBooking(booking: BookingModel): void {
    this.database.object(`/bookings/users/${booking.key}`).valueChanges()
      .pipe(
        take(1),
        tap((record: BookingDto) => {
         this.recordTransactionByOperation(Operation.Cancel, booking);
        })
      ).subscribe();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Subtracts medicines from db and pushes new booking.
 ***REMOVED*****REMOVED*** @param medicines - to be booked.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Do some actions to store info about transaction in db.
 ***REMOVED*****REMOVED*** @param operation - alias to transaction status.
 ***REMOVED*****REMOVED*** @param transaction - to be saved.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Subtract medicines from db medicines list.
 ***REMOVED*****REMOVED*** @param medicines - are booked.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Restores medicines to db from cancelled booking.
 ***REMOVED*****REMOVED*** @param medicines - to be restored.
 ***REMOVED*****REMOVED***/
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

***REMOVED****
***REMOVED*** For easier visibility of method action above.
***REMOVED***/
enum Operation {
  Success,
  Fail,
  Cancel,
}
