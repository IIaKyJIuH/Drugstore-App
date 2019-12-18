import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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
    private dialog: MatDialog
  ) {
    this.allBookings$ = this.getAllBookings();
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
        tap(console.log)
      );
  }

  setToPrepared(booking): void {
    booking.isReady = true;
    this.saveToLocalStorage(booking);
    // TODO: send sms notification
  }

  private saveToLocalStorage(booking): void {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    let found = false;
    for(const each of savedSpike) {
      if (JSON.stringify(each) === JSON.stringify(booking)) {
        found = true;
        break;
      }
    }
    if (!found) {
      savedSpike.push(booking);
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

  setToSuccessfulTransaction(booking): void {

  }

  setToFailedTransaction(booking): void {
    
  }

  getMyBookings(): Observable<any> {
    return this.bookingsService.getMyBookings();
  }

  unBookTransaction(transaction): void {
    this.openConfirmationDialog()
      .pipe(take(1))
      .subscribe(
        (isConfirmed) => {
          if (isConfirmed) {
            this.bookingsService.unBookTransactionFrom(transaction);
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
