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

 ***REMOVED*****REMOVED****
  ***REMOVED*** All booked items from db.
  ***REMOVED***/
  allBookings$: Observable<BookingModel[]>;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param dialog - for confirmation dialogs.
  ***REMOVED*** @param database - for interacting with db data.
  ***REMOVED*** @param bookingsService - for dealing with bookings.
  ***REMOVED*** @param notifications - for getting result of operations.
  ***REMOVED*** @param authService - for getting current auth data.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all reserved bookings from db.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Sets ready status for booking.
  ***REMOVED*** @param transaction - booking to be set to prepared.
  ***REMOVED***/
  setToPrepared(transaction: BookingModel): void {
    transaction.isReady = true;
    this.updateLocalStorage(transaction);
    // TODO: send sms notification
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Updates local storage isReady status for given transaction.
  ***REMOVED*** @param transaction - for searching in the local storage.
  ***REMOVED***/
  private updateLocalStorage(transaction: BookingModel): void {
    const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const localRecord = savedSpike.find(x => x.key === transaction.key);
    if (localRecord) {
      localRecord.isReady = true;
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Removes transaction from local storage.
  ***REMOVED*** @param transaction - to be removed from local storage.
  ***REMOVED***/
  private removeFromLocalStorage(transaction: BookingModel): void {
    const savedSpike: BookingModel[] = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const localRecordIndex = savedSpike.findIndex(x => x.key === transaction.key);
    if (localRecordIndex !== -1) {
      savedSpike.splice(localRecordIndex, 1);
      localStorage.removeItem('savedSpike');
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Marks given transaction as successful.
  ***REMOVED*** @param transaction - that is succeeded.
  ***REMOVED***/
  setToSuccessfulTransaction(transaction: BookingModel): void {
    this.bookingsService.setToSuccessfulTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Marks given transaction as failed.
  ***REMOVED*** @param transaction - that is failed.
  ***REMOVED***/
  setToFailedTransaction(transaction: BookingModel): void {
    this.bookingsService.setToFailedTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all transaction off the current signed-in client.
  ***REMOVED***/
  getMyBookings(): Observable<BookingModel[]> {
    return this.bookingsService.getCurrentUserBookings();
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Cancel reserved booking from db.
  ***REMOVED*** @param booking - to be cancelled.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** For confirmation of the booking cancellation.
  ***REMOVED***/
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
