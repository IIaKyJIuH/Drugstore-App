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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Concatenates key fields from db to each item for bookings.
  ***REMOVED*** @param object - object to be converted.
  ***REMOVED***/
  public static mapObjectToArray(object: object): any[] {
    const arr = [];
    for (const key of Object.keys(object)) {
      const current = object[key];
      if (key !== 'default') {
        arr.push(Object.assign(current, {
          key
        }));
      }
    }
    return arr;
  }

  // private static getMedicineByName(medicine: )

 ***REMOVED*****REMOVED****
  ***REMOVED*** For easier interacting in app.
  ***REMOVED*** @param dtoArr - dto bookings from db.
  ***REMOVED***/
  private static mapDtoArrayToModelArray(dtoArr: BookingDto[]): BookingModel[] {
    const resultModelArr: BookingModel[] = [];
    for (const dto of dtoArr) {
      const itemsModel = [];
      for (const item of dto.items) {
        itemsModel.push(new MedicineModel({
          amount: item.count,
          name: item.term,
          key: item.key,
          pharmacy: item.pharmacy
        }))
      }
      resultModelArr.push(new BookingModel({
        email: dto.email,
        medicines: itemsModel,
        key: dto.key,
        isReady: false,
      }));
    }
    return resultModelArr;
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param database - for interacting with firebase db.
  ***REMOVED*** @param archiveService - for storing info about transactions into db archive..
  ***REMOVED*** @param authService - for getting user auth info.
  ***REMOVED*** @param statisticsService - for storing info about transactions into db statistics.
  ***REMOVED***/
  constructor(
    private database: AngularFireDatabase,
    private archiveService: ArchiveService,
    private authService: AuthenticationService,
    private statisticsService: StatisticsService,
  ) { }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all bookings from db.
  ***REMOVED***/
  getAllBookings(): Observable<BookingModel[]> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((records: object) => {
        const arr = BookingsService.mapObjectToArray(records);
        return BookingsService.mapDtoArrayToModelArray(arr);
      }),
    );
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all bookings corresponding to the current user.
  ***REMOVED***/
  getCurrentUserBookings(): Observable<BookingModel[]> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((records: object) => {
        const currentEmail = this.authService.getUserData().email;
        const arr = ProjectFunctions.mapObjectToArrayForUser(records, currentEmail);
        return BookingsService.mapDtoArrayToModelArray(arr);
      })
    );
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Records this transaction as successful in db.
  ***REMOVED*** @param transaction - to be saved.
  ***REMOVED***/
  setToSuccessfulTransaction(transaction: BookingModel): void {
    this.recordTransactionByOperation(Operation.Success, transaction);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Records this transaction as failed in db.
  ***REMOVED*** @param transaction - to be saved.
  ***REMOVED***/
  setToFailedTransaction(transaction: BookingModel): void {
    this.recordTransactionByOperation(Operation.Fail, transaction);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Records this transaction as cancelled in db.
  ***REMOVED*** @param booking - to be saved.
  ***REMOVED***/
  cancelBooking(booking: BookingModel): void {
     this.recordTransactionByOperation(Operation.Cancel, booking);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Subtracts medicines from db and pushes new booking.
  ***REMOVED*** @param medicines - to be booked.
  ***REMOVED***/
  bookMedicines(medicines: MedicineModel[]): void {
    const currentEmail = this.authService.getUserData().email;
    const medicinesDto: MedicineDto[] = [];
    for (const medicine of medicines) {
      medicinesDto.push({
        term: medicine.name,
        count: medicine.amount,
        key: medicine.key,
        pharmacy: medicine.pharmacy
      })
    }
    this.database.list('/bookings/users/').push({ email: currentEmail, items: medicinesDto } as BookingDto);
    this.subMedicinesFromDb(medicines);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Do some actions to store info about transaction in db.
  ***REMOVED*** @param operation - alias to transaction status.
  ***REMOVED*** @param transaction - to be saved.
  ***REMOVED***/
  private recordTransactionByOperation(operation: Operation, transaction: BookingModel): void {
    switch (operation) {
      case Operation.Success:
        this.archiveService.writeSuccessfulTransaction(transaction);
        this.statisticsService.writeSuccessfulTransaction(transaction);
        this.database.object(`/bookings/users/${transaction.key}`).remove();
        break;
      case Operation.Fail:
        this.restoreMedicinesToDb(transaction.medicines);
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Subtract medicines from db medicines list.
  ***REMOVED*** @param medicines - are booked.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Restores medicines to db from cancelled booking.
  ***REMOVED*** @param medicines - to be restored.
  ***REMOVED***/
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
