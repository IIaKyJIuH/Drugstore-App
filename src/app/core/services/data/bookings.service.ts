import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { ArchiveService } from './archive.service';
import { StatisticsService } from './statistics.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService,
    private statisticsService: StatisticsService,
    private archiveService: ArchiveService
  ) { }

  getAllBookings(): Observable<any> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((recordings: any) => {
        const bookingsArray = [];
        for (const [index, recordKey] of Object.keys(recordings).entries()) {
          if (recordKey !== 'default') {
            bookingsArray.push(recordings[recordKey]);
          }
        }
        return bookingsArray;
      }),
    );
  }

  getMyBookings(): Observable<any> {
    return this.database.object('/bookings/users').valueChanges().pipe(
      map((recordings: any) => {
        const currentEmail = this.authService.getUserData().email;
        const bookingsArray = [];
        for (const [index, recordKey] of Object.keys(recordings).entries()) {
          if (recordings[recordKey].email === currentEmail) {
            bookingsArray.push(recordings[recordKey]);
          }
        }
        return bookingsArray;
      })
    );
  }

  setToSuccessfulTransaction(transaction): void {
    const transactionAsStr = JSON.stringify(transaction.items);
    this.database.object('/bookings/users/').valueChanges()
      .pipe(
        tap(recordings => {
          for (const [index, recordKey] of Object.keys(recordings).entries()) {
            const loopTransaction = recordings[recordKey];
            if (loopTransaction.email === transaction.email) {
              if (JSON.stringify(loopTransaction.items) === transactionAsStr) {
                this.archiveService.writeSuccessfulTransaction(loopTransaction);
                this.statisticsService.writeSuccessfulTransaction(loopTransaction);
                this.database.object(`/bookings/users/${recordKey}`).remove();
                return;
              }
            }
          }
        })
      ).subscribe();
  }

  setToFailedTransaction(transaction): void {
    const transactionAsStr = JSON.stringify(transaction.items);
    this.database.object('/bookings/users/').valueChanges()
    .pipe(
      take(1),
      tap(recordings => {
        for (const [index, recordKey] of Object.keys(recordings).entries()) {
          const loopTransaction = recordings[recordKey];
          if (loopTransaction.email === transaction.email) {
            if (JSON.stringify(loopTransaction.items) === transactionAsStr) {
              this.archiveService.writeFailedTransaction(loopTransaction);
              this.statisticsService.writeFailedTransaction(loopTransaction);
              this.database.object(`/bookings/users/${recordKey}`).remove();
              return;
            }
          }
        }
      })
    ).subscribe();
  }

  cancellBooking(booking): void {
    const bookingAsStr = JSON.stringify(booking.items);
    this.database.object('/bookings/users/').valueChanges()
      .pipe(
        take(1),
        tap(recordings => {
          for (const [index, recordKey] of Object.keys(recordings).entries()) {
            const loopTransaction = recordings[recordKey];
            if (loopTransaction.email === booking.email) {
              if (JSON.stringify(loopTransaction.items) === bookingAsStr) {
                this.archiveService.writeCancelledBooking(loopTransaction);
                this.statisticsService.writeCancelledBooking(loopTransaction);
                this.database.object(`/bookings/users/${recordKey}`).remove();
                this.restoreMedicinesToDb(loopTransaction.items);
                return;
              }
            }
          }
        })
      ).subscribe();
  }

  subMedicinesFromDb(items): void {
    for (const item of items) {
      this.database.object(`/medicines/pharmacies/${item.pharmacy}/${item.key}`).valueChanges()
        .pipe(
          take(1),
          tap((medicine: any) => {
            this.database.object(`/medicines/pharmacies/${item.pharmacy}/${item.key}/count`).set(medicine.count - item.count);
          })
        ).subscribe();
    }
  }

  private restoreMedicinesToDb(items): void {
    for (const item of items) {
      this.database.object(`/medicines/pharmacies/${item.pharmacy}/${item.key}`).valueChanges()
        .pipe(
          take(1),
          tap((medicine: any) => {
            this.database.object(`/medicines/pharmacies/${item.pharmacy}/${item.key}/count`).set(medicine.count + item.count);
          })
        ).subscribe();
    }
  }

}
