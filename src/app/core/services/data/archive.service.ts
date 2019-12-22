import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { BookingModel } from '../models/bookings/booking-model';
import { MedicineModel } from '../models/medicines/medicine-model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Get actual date in format 'YYYY-MM-DD HH:MM'
 ***REMOVED*****REMOVED***/
  private static getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ArchiveService.normalizeSymbolsCount(currentDate.getMonth()+1);
    const day = ArchiveService.normalizeSymbolsCount(currentDate.getDate());
    const hours = ArchiveService.normalizeSymbolsCount(currentDate.getHours());
    const minutes = ArchiveService.normalizeSymbolsCount(currentDate.getMinutes());
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Makes two symbols digit from time if needed.
 ***REMOVED*****REMOVED*** @param time - given time.
 ***REMOVED*****REMOVED***/
  private static normalizeSymbolsCount(time: number): string {
    const timeAsStr = time+'';
    return timeAsStr.length === 1 ? `0${timeAsStr}` : timeAsStr;
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Sums all booked medicines and returns their amount.
 ***REMOVED*****REMOVED*** @param medicines - source to sum booked medicines amount.
 ***REMOVED*****REMOVED***/
  private static getMedicinesAmount(medicines: MedicineModel[]): number {
    return medicines.reduce((accumulated, {amount}) => accumulated + amount, 0);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param database - for interacting with current project db archive list.
 ***REMOVED*****REMOVED*** @param authService - for getting current user data mostly.
 ***REMOVED*****REMOVED***/
  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) {}

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Gets all transactions from the archive.
 ***REMOVED*****REMOVED***/
  getAllTransactions(): Observable<any> {
    return this.database.list('/archive/transactions/').valueChanges()
      .pipe(
        map(recordings => {
          const transactionsArr = [];
          for (const recordKey of Object.keys(recordings)) {
            transactionsArr.push(recordings[recordKey]);
          }
          return transactionsArr;
        })
      )
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Records cancelled booking in the archive.
 ***REMOVED*****REMOVED*** @param booking - contains info about booking.
 ***REMOVED*****REMOVED***/
  writeCancelledBooking(booking: BookingModel): void {
    const currentTime = ArchiveService.getCurrentDate();
    const itemsCount = ArchiveService.getMedicinesAmount(booking.medicines);
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: itemsCount,
      userEmail: booking.email,
      status: 'cancelled'
    });
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Records successful transaction in the archive.
 ***REMOVED*****REMOVED*** @param transaction - contains info about transaction.
 ***REMOVED*****REMOVED***/
  writeSuccessfulTransaction(transaction: BookingModel): void {
    const currentTime = ArchiveService.getCurrentDate();
    const currentUser = this.authService.getUserData();
    const itemsCount = ArchiveService.getMedicinesAmount(transaction.medicines);
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: itemsCount,
      staffEmail: currentUser.email,
      userEmail: transaction.email,
      status: 'success'
    });
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Records failed transaction in the archive.
 ***REMOVED*****REMOVED*** @param transaction - contains info about transaction.
 ***REMOVED*****REMOVED***/
  writeFailedTransaction(transaction: BookingModel): void {
    const currentTime = ArchiveService.getCurrentDate();
    const currentUser = this.authService.getUserData();
    const itemsCount = ArchiveService.getMedicinesAmount(transaction.medicines);
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: itemsCount,
      staffEmail: currentUser.email,
      userEmail: transaction.email,
      status: 'failure'
    });
  }

}
