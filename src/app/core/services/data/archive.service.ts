import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  currentUser: any;

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) {
    this.currentUser = this.authService.getUserData();
   }

  writeCancelledBooking(booking): void {
    const currentDate = new Date();
    const currentTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: booking.items.length,
      userEmail: booking.email,
      status: 'cancelled'
    });
  }

  writeSuccessfulTransaction(transaction): void {
    const currentDate = new Date();
    const currentTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: transaction.items.length,
      staffEmail: this.currentUser.email,
      userEmail: transaction.email,
      status: 'success'
    });
  }

  writeFailedTransaction(transaction): void {
    const currentDate = new Date();
    const currentTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    this.database.list('/archive/transactions/').push({
      date: currentTime,
      purchases: transaction.items.length,
      staffEmail: this.currentUser.email,
      userEmail: transaction.email,
      status: 'failure'
    });
  }

}
