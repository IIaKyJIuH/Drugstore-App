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
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    return this.bookingsService.getAllBookings()
      .pipe(
        map(bookingsArr => {
          for(const [index, item] of bookingsArr.entries()) {
            Object.assign(item, {
              key: index
            });
            const isFound = this.findObjInLocalStorage(item)
            Object.assign(item, {
              isReady: this.tryGetLocalStorageValue(item),
            });
            if (!isFound) {
              savedSpike.push(item);
            }
          }
          localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
          return bookingsArr;
        }),
      );
  }

  setToPrepared(transaction): void {
    transaction.isReady = true;
    this.updateLocalStorage(transaction);
    // TODO: send sms notification
  }

  private updateLocalStorage(transaction): void {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    const copiedTransaction = Object.assign({}, transaction);
    delete copiedTransaction.isReady;
    for(const each of savedSpike) {
      const copiedObj = Object.assign({}, each);
      delete copiedObj.isReady;
      if (JSON.stringify(copiedObj) === JSON.stringify(copiedTransaction)) {
        each.isReady = true;
        localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
        break;
      }
    }
  }

  private tryGetLocalStorageValue(itemWithKey): boolean {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    for(const each of savedSpike) {
      const reducedObj = Object.assign({}, each);
      delete reducedObj.isReady;
      if (JSON.stringify(itemWithKey) === JSON.stringify(reducedObj)) {
        return each.isReady;
      }
    }
    return false;
  }

  private findObjInLocalStorage(itemWithKey): boolean {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    for(const each of savedSpike) {
      const reducedObj = Object.assign({}, each);
      delete reducedObj.isReady;
      if (JSON.stringify(itemWithKey) === JSON.stringify(reducedObj)) {
        return true;
      }
    }
    return false
  }

  private removeFromLocalStorage(transaction): void {
    const savedSpike = localStorage.getItem('savedSpike') ? JSON.parse(localStorage.getItem('savedSpike')) : [];
    for(const each of savedSpike) {
      if (JSON.stringify(each) === JSON.stringify(transaction)) {
        savedSpike.splice(each.key, 1);
        localStorage.setItem('savedSpike', JSON.stringify(savedSpike));
        break;
      }
    }
  }

  setToSuccessfulTransaction(transaction): void {
    this.bookingsService.setToSuccessfulTransaction(transaction);
    this.removeFromLocalStorage(transaction);
  }

  setToFailedTransaction(transaction): void {
    this.bookingsService.setToFailedTransaction(transaction);
    this.removeFromLocalStorage(transaction);
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
      width: '400px',
      data: {
        message: 'Your booking will be cancelled'
      }
    });

    return dialogRef.afterClosed();
  }

}
