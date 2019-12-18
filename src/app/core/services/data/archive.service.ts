import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) {}

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

  writeCancelledBooking(booking): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.normalizeSymbolsCount(currentDate.getMonth()+1);
    const day = this.normalizeSymbolsCount(currentDate.getDate());
    const hours = this.normalizeSymbolsCount(currentDate.getHours());
    const minutes = this.normalizeSymbolsCount(currentDate.getMinutes());
    const currentTime = `${year}-${month}-${day}, ${hours}:${minutes}`;
    const itemsCount = booking.items.reduce((temp, {count}) => temp + count, 0);
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: itemsCount,
      userEmail: booking.email,
      status: 'cancelled'
    });
  }

  writeSuccessfulTransaction(transaction): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.normalizeSymbolsCount(currentDate.getMonth()+1);
    const day = this.normalizeSymbolsCount(currentDate.getDate());
    const hours = this.normalizeSymbolsCount(currentDate.getHours());
    const minutes = this.normalizeSymbolsCount(currentDate.getMinutes());
    const currentTime = `${year}-${month}-${day}, ${hours}:${minutes}`;
    const currentUser = this.authService.getUserData();
    const itemsCount = transaction.items.reduce((temp, {count}) => temp + count, 0);
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: itemsCount,
      staffEmail: currentUser.email,
      userEmail: transaction.email,
      status: 'success'
    });
  }

  writeFailedTransaction(transaction): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.normalizeSymbolsCount(currentDate.getMonth()+1);
    const day = this.normalizeSymbolsCount(currentDate.getDate());
    const hours = this.normalizeSymbolsCount(currentDate.getHours());
    const minutes = this.normalizeSymbolsCount(currentDate.getMinutes());
    const currentTime = `${year}-${month}-${day}, ${hours}:${minutes}`;
    const currentUser = this.authService.getUserData();
    const itemsCount = transaction.items.reduce((temp, {count}) => temp + count, 0);
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: itemsCount,
      staffEmail: currentUser.email,
      userEmail: transaction.email,
      status: 'failure'
    });
  }

  private normalizeSymbolsCount(input): string {
    const inputAsStr = input+'';
    if (inputAsStr.length === 1) {
      return `0${inputAsStr}`;
    } else {
      return inputAsStr;
    }
  }

}
