import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { ArchiveService } from './archive.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService,
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

  unBookTransactionFrom(element): void {
    const itemAsStr = JSON.stringify(element);
    this.database.object('/bookings/users/').valueChanges()
      .pipe(
        take(1),
        tap(recordings => {
          const currentEmail = this.authService.getUserData().email;
          for (const [index, recordKey] of Object.keys(recordings).entries()) {
            const transaction = recordings[recordKey];
            if (transaction.email === currentEmail) {
              if (JSON.stringify(transaction.items) === itemAsStr) {
                this.archiveService.writeUnBookedTransaction(transaction); // TODO: write ARCHIVE
                this.database.object(`/bookings/users/${recordKey}`).remove();
                this.restoreMedicinesToDb(transaction.items);
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
