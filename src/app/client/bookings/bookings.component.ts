import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { BookingsService } from 'src/app/core/services/data/bookings.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  allBookings$: Observable<any>;

  constructor(
    private bookingsService: BookingsService,
    private database: AngularFireDatabase,
    private notifications: NotificationService,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {
    const userRole = authService.getUserData().role;
    this.allBookings$ = userRole === 'STAFF' ? this.getAllBookings() : this.getMyBookings();
   }

  getAllBookings(): Observable<any> {
    const savedSpike = JSON.parse(localStorage.getItem('savedSpike'));
    return this.bookingsService.getAllBookings()
      .pipe(
        map(bookingsArr => {
          for(const item of bookingsArr) {
            Object.assign(item, {
              isReady: this.tryGetLocalStorageValue(item)
            });
          }
          return bookingsArr;
        }),
      );
  }

  setToPrepared(transaction): void {
    transaction.isReady = true;
    this.saveToLocalStorage(transaction);
    // TODO: send sms notification
  }

  private saveToLocalStorage(transaction): void {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    let found = false;
    for(const each of savedSpike) {
      if (JSON.stringify(each) === JSON.stringify(transaction)) {
        found = true;
        break;
      }
    }
    if (!found) {
      savedSpike.push(transaction);
      localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
    }
  }

  private tryGetLocalStorageValue(item): boolean {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    for(const each of savedSpike) {
      const reducedObj = Object.assign({}, {
        email: each.email,
        items: each.items
      });
      if (JSON.stringify(item) === JSON.stringify(reducedObj)) {
        return each.isReady;
      }
    }
    return false;
  }

  setToSuccessfulTransaction(transaction): void {
    this.bookingsService.setToSuccessfulTransaction(transaction);
  }

  setToFailedTransaction(transaction): void {
    this.bookingsService.setToFailedTransaction(transaction);
  }

  getMyBookings(): Observable<any> {
    return this.bookingsService.getMyBookings();
  }

  cancellBooking(booking): void {
    this.openConfirmationDialog()
      .pipe(take(1))
      .subscribe(
        (isConfirmed) => {
          if (isConfirmed) {
            this.bookingsService.cancellBooking(booking);
            this.notifications.showWarning('Transaction was cancelled', 'Unbooked');
          }
        }
      );
  }

  private openConfirmationDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50vw',
      data: {
        message: 'Your booking will be cancelled'
      }
    });

    return dialogRef.afterClosed();
  }

}
