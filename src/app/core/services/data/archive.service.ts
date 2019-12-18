import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) {}

  writeCancelledBooking(booking): void {
    const currentDate = new Date();
    const currentTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
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
    const currentTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
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
    const currentTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
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

}
