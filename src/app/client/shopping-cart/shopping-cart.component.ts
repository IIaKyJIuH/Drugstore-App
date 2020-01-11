import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookingsService } from 'src/app/core/services/data/bookings.service';
import { ShoppingCartService } from 'src/app/core/services/data/shopping-cart.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MedicineModel } from '../../core/services/models/medicines/medicine-model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Items selected by user for booking.
  ***REMOVED***/
  myItems$: Observable<MedicineModel[]>;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Columns for mat-table.
  ***REMOVED***/
  displayedColumns = ['Name', 'Count', 'Pharmacy', 'Controls'];

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param dialog - for confirmation of the booking operation.
  ***REMOVED*** @param cartService - for dealing with cart items.
  ***REMOVED*** @param bookingsService - for booking specific items.
  ***REMOVED*** @param notifications - for getting info about operations.
  ***REMOVED***/
  constructor(
    private dialog: MatDialog,
    private cartService: ShoppingCartService,
    private bookingsService: BookingsService,
    private notifications: NotificationService,
  ) {
    this.myItems$ = this.cartService.getCurrentCart();
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Books selected items after confirmation.
  ***REMOVED*** @param items - to be booked.
  ***REMOVED***/
  bookItems(items: MedicineModel[]): void {
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** For confirmation of the booking.
  ***REMOVED***/
  private openConfirmationDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Click "Yes" button if you want to book selected items'
      }
    });

    return dialogRef.afterClosed();
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Removes all selected items from shopping-cart.
  ***REMOVED*** @param items - to be deleted.
  ***REMOVED***/
  removeAll(items: MedicineModel[]): void {
    this.cartService.removeItems(items);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Adds or increases cart with the given element.
  ***REMOVED*** @param element - to be add/increased.
  ***REMOVED***/
  addToCart(element: MedicineModel): void {
    this.cartService.addItem(element);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Removes or subtracts the given element from cart.
  ***REMOVED*** @param element - to be removed/subtracted.
  ***REMOVED***/
  subFromCart(element: MedicineModel): void {
    this.cartService.minusItem(element);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** For checking if the given element is in cart now.
  ***REMOVED*** @param element - to be checked.
  ***REMOVED***/
  isInCart(element: MedicineModel): boolean {
    return this.cartService.isInCart(element);
  }

}
