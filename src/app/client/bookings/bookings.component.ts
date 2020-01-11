import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { BookingsService } from 'src/app/core/services/data/bookings.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { BookingModel } from '../../core/services/models/bookings/booking-model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  allBookings$: Observable<BookingModel[]>;

  constructor(
    private dialog: MatDialog,
    private database: AngularFireDatabase,
    private bookingsService: BookingsService,
    private notifications: NotificationService,
    private authService: AuthenticationService,
  ) {
    const userRole = authService.getUserData().role;
    this.allBookings$ = userRole === 'STAFF' ? this.getAllBookings() : this.getMyBookings();
   }

  getAllBookings(): Observable<BookingModel[]> {
    return this.bookingsService.getAllBookings()
      .pipe(
        map((bookingsArr: BookingModel[]) => {
          const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
          for(const booking of bookingsArr) {
            const localRecord = savedSpike.find(x => x.key === booking.key);
            if (!localRecord) {
              savedSpike.push(booking);
            } else {
              booking.isReady = localRecord.isReady;
            }
          }
          localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
          return bookingsArr;
        }),
      );
  }

  setToPrepared(transaction: BookingModel): void {
    transaction.isReady = true;
    this.updateLocalStorage(transaction);
    // TODO: send sms notification
  }

  private updateLocalStorage(transaction: BookingModel): void {
    const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const localRecord = savedSpike.find(x => x.key === transaction.key);
    if (localRecord) {
      localRecord.isReady = true;
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

  private removeFromLocalStorage(transaction: BookingModel): void {
    const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const localRecordIndex = savedSpike.findIndex(x => x.key === transaction.key);
    if (localRecordIndex !== -1) {
      savedSpike.splice(localRecordIndex, 1);
      localStorage.removeItem('savedSpike');
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

  setToSuccessfulTransaction(transaction: BookingModel): void {
    this.bookingsService.setToSuccessfulTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

  setToFailedTransaction(transaction: BookingModel): void {
    this.bookingsService.setToFailedTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

  getMyBookings(): Observable<BookingModel[]> {
    return this.bookingsService.getCurrentUserBookings();
  }

  cancelBooking(booking: BookingModel): void {
    this.openConfirmationDialog()
      .pipe(take(1))
      .subscribe(
        (isConfirmed) => {
          if (isConfirmed) {
            this.bookingsService.cancelBooking(booking);
            this.notifications.showWarning('Transaction was cancelled', 'Unbooked');
          }
        }
      );
  }

  private openConfirmationDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Your booking will be cancelled'
      }
    });

    return dialogRef.afterClosed();
  }

}
