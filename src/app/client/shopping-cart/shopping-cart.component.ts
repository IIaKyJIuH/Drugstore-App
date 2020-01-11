import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookingsService } from 'src/app/core/services/data/bookings.service';
import { ShoppingCartService } from 'src/app/core/services/data/shopping-cart.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Items selected by user for booking.
 ***REMOVED*****REMOVED***/
  myItems$: Observable<any>;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Columns for mat-table.
 ***REMOVED*****REMOVED***/
  displayedColumns = ['Name', 'Count', 'Pharmacy', 'Controls'];

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param dialog - for confirmation of the booking operation.
 ***REMOVED*****REMOVED*** @param cartService - for dealing with cart items.
 ***REMOVED*****REMOVED*** @param bookingsService - for booking specific items.
 ***REMOVED*****REMOVED*** @param notifications - for getting info about operations.
 ***REMOVED*****REMOVED***/
  constructor(
    private dialog: MatDialog,
    private cartService: ShoppingCartService,
    private bookingsService: BookingsService,
    private notifications: NotificationService,
  ) {
    this.myItems$ = this.cartService.getCurrentCart();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Books selected items after confirmation.
 ***REMOVED*****REMOVED*** @param items - to be booked.
 ***REMOVED*****REMOVED***/
  bookItems(items): void {
    this.openConfirmationDialog()
      .pipe(take(1))
      .subscribe(
        (isConfirmed) => {
          if (isConfirmed) {
            this.cartService.bookMedicines(items);
            this.removeAll(items);
            this.notifications.showSuccess('Alright, your medicine products will be prepared as soon as possible', 'Booked');
          }
        }
      );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For confirmation of the booking.
 ***REMOVED*****REMOVED***/
  private openConfirmationDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Click "Yes" button if you want to book selected items'
      }
    });

    return dialogRef.afterClosed();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Removes all selected items from shopping-cart.
 ***REMOVED*****REMOVED*** @param items - to be deleted.
 ***REMOVED*****REMOVED***/
  removeAll(items): void {
    this.cartService.removeItems(items);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Adds or increases cart with the given element.
 ***REMOVED*****REMOVED*** @param element - to be add/increased.
 ***REMOVED*****REMOVED***/
  addToCart(element): void {
    this.cartService.addItem(element);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Removes or subtracts the given element from cart.
 ***REMOVED*****REMOVED*** @param element - to be removed/subtracted.
 ***REMOVED*****REMOVED***/
  subFromCart(element): void {
    this.cartService.minusItem(element);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For checking if the given element is in cart now.
 ***REMOVED*****REMOVED*** @param element - to be checked.
 ***REMOVED*****REMOVED***/
  isInCart(element): boolean {
    return this.cartService.isInCart(element);
  }

}
