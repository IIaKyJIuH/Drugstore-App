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

  /**
   * All booked items from db.
   */
  allBookings$: Observable<BookingModel[]>;

  /**
   * .ctor
   * @param dialog - for confirmation dialogs.
   * @param database - for interacting with db data.
   * @param bookingsService - for dealing with bookings.
   * @param notifications - for getting result of operations.
   * @param authService - for getting current auth data.
   */
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

  /**
   * Gets all reserved bookings from db.
   */
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

  /**
   * Sets ready status for booking.
   * @param transaction - booking to be set to prepared.
   */
  setToPrepared(transaction: BookingModel): void {
    transaction.isReady = true;
    this.updateLocalStorage(transaction);
    // TODO: send sms notification
  }

  /**
   * Updates local storage isReady status for given transaction.
   * @param transaction - for searching in the local storage.
   */
  private updateLocalStorage(transaction: BookingModel): void {
    const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const localRecord = savedSpike.find(x => x.key === transaction.key);
    if (localRecord) {
      localRecord.isReady = true;
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

  /**
   * Removes transaction from local storage.
   * @param transaction - to be removed from local storage.
   */
  private removeFromLocalStorage(transaction: BookingModel): void {
    const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const localRecordIndex = savedSpike.findIndex(x => x.key === transaction.key);
    if (localRecordIndex !== -1) {
      savedSpike.splice(localRecordIndex, 1);
      localStorage.removeItem('savedSpike');
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

  /**
   * Marks given transaction as successful.
   * @param transaction - that is succeeded.
   */
  setToSuccessfulTransaction(transaction: BookingModel): void {
    this.bookingsService.setToSuccessfulTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

  /**
   * Marks given transaction as failed.
   * @param transaction - that is failed.
   */
  setToFailedTransaction(transaction: BookingModel): void {
    this.bookingsService.setToFailedTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

  /**
   * Gets all transaction off the current signed-in client.
   */
  getMyBookings(): Observable<BookingModel[]> {
    return this.bookingsService.getCurrentUserBookings();
  }

  /**
   * Cancel reserved booking from db.
   * @param booking - to be cancelled.
   */
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

  /**
   * For confirmation of the booking cancellation.
   */
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
