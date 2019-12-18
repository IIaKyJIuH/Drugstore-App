import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) {}

  getMedicinesStatistics(): Observable<any> {
    return this.database.list('/statistics/medicines/').valueChanges()
      .pipe(
        map(recordings => {
          const resultArr = [];
          for(const recordKey of Object.keys(recordings)) {
            resultArr.push(recordings[recordKey]);
          }
          return resultArr;
        })
      );
  }

  getStaffStatistics(): Observable<any> {
    return this.database.list('/statistics/staff/').valueChanges()
      .pipe(
        map(recordings => {
          const resultArr = [];
          for(const recordKey of Object.keys(recordings)) {
            resultArr.push(recordings[recordKey]);
          }
          return resultArr;
        })
      );
  }

  getUsersStatistics(): Observable<any> {
    return this.database.list('/statistics/users/').valueChanges()
      .pipe(
        map(recordings => {
          const resultArr = [];
          for(const recordKey of Object.keys(recordings)) {
            resultArr.push(recordings[recordKey]);
          }
          return resultArr;
        })
      );
  }

  writeSuccessfulTransaction(transaction): void {
    const userEmail = transaction.email;
    this.writeMedicines(transaction.items);
    this.writeSuccessfulUser(transaction);
    this.writeStaff(transaction);
  }

  writeCancelledBooking(booking): void {
    this.writeCancelledUser(booking);
  }

  writeFailedTransaction(transaction): void {
    this.writeFailedUser(transaction);
  }

  private writeMedicines(medicines): void {
    this.database.object('/statistics/medicines/').valueChanges()
    .pipe(
      take(1),
      tap(records => {
        for (const item of medicines) {
          let isFound = false;
          for (const recordKey of Object.keys(records)) {
            if (records[recordKey].term === item.term) {
              isFound = true;
              this.database.object(`/statistics/medicines/${recordKey}/purchased`).set(records[recordKey].purchased + item.count);
            }
          }
          if (!isFound) {
            this.database.list('/statistics/medicines/').push(
              Object.assign({}, {
                purchased: item.count,
                term: item.term
              })
            );
          }
        }
      })
    ).subscribe();
  }

  private writeStaff(transaction): void {
    const staffEmail = this.authService.getUserData().email;
    const itemsCount = transaction.items.reduce((temp, {count}) => temp + count, 0);
    this.database.object('/statistics/staff/').valueChanges()
      .pipe(
        take(1),
        tap(records => {
          let isFound = false;
          for (const recordKey of Object.keys(records)) {
            if (records[recordKey].email === staffEmail) {
              isFound = true;
              this.database.object(`/statistics/staff/${recordKey}/purchasedItems`).set(records[recordKey].purchasedItems + itemsCount);
            }
          }
          if (!isFound) {
            this.database.list(`/statistics/staff/`).push(
              Object.assign({}, {
                email: staffEmail,
                purchasedItems: itemsCount
              })
            );
          }
        })
      ).subscribe();
  }

  private writeSuccessfulUser(transaction): void {
    const itemsCount = transaction.items.reduce((temp, {count}) => temp + count, 0);
    this.database.object('/statistics/users/').valueChanges()
      .pipe(
        take(1),
        tap(records => {
          let isFound = false;
          for (const recordKey of Object.keys(records)) {
            if (records[recordKey].email === transaction.email) {
              isFound = true;
              this.database.object(`/statistics/users/${recordKey}/purchasedItems`).set(records[recordKey].purchasedItems + itemsCount);
            }
          }
          if (!isFound) {
            this.database.list(`/statistics/users/`).push(
              Object.assign({}, {
                cancelledBookings: 0,
                email: transaction.email,
                purchasedItems: itemsCount,
                failures: 0
              })
            );
          }
        })
      ).subscribe();
  }

  private writeCancelledUser(transaction): void {
    this.database.object('/statistics/users/').valueChanges()
      .pipe(
        take(1),
        tap(records => {
          let isFound = false;
          for (const recordKey of Object.keys(records)) {
            if (records[recordKey].email === transaction.email) {
              isFound = true;
              this.database.object(`/statistics/users/${recordKey}/cancelledBookings`).set(records[recordKey].cancelledBookings + 1);
            }
          }
          if (!isFound) {
            this.database.list(`/statistics/users/`).push(
              Object.assign({}, {
                cancelledBookings: 1,
                email: transaction.email,
                purchasedItems: 0,
                failures: 0
              })
            );
          }
        })
      ).subscribe();
  }

  private writeFailedUser(transaction): void {
    this.database.object('/statistics/users/').valueChanges()
      .pipe(
        take(1),
        tap(records => {
          let isFound = false;
          for (const recordKey of Object.keys(records)) {
            if (records[recordKey].email === transaction.email) {
              isFound = true;
              this.database.object(`/statistics/users/${recordKey}/failures`).set(records[recordKey].failures + 1);
            }
          }
          if (!isFound) {
            this.database.list(`/statistics/users/`).push(
              Object.assign({}, {
                cancelledBookings: 0,
                email: transaction.email,
                purchasedItems: 0,
                failures: 1
              })
            );
          }
        })
      ).subscribe();
  }
}
