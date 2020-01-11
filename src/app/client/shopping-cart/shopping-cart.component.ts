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

  /**
   * Items selected by user for booking.
   */
  myItems$: Observable<any>;

  /**
   * Columns for mat-table.
   */
  displayedColumns = ['Name', 'Count', 'Pharmacy', 'Controls'];

  /**
   * .ctor
   * @param dialog - for confirmation of the booking operation.
   * @param cartService - for dealing with cart items.
   * @param bookingsService - for booking specific items.
   * @param notifications - for getting info about operations.
   */
  constructor(
    private dialog: MatDialog,
    private cartService: ShoppingCartService,
    private bookingsService: BookingsService,
    private notifications: NotificationService,
  ) {
    this.myItems$ = this.cartService.getCurrentCart();
  }

  /**
   * Books selected items after confirmation.
   * @param items - to be booked.
   */
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

  /**
   * For confirmation of the booking.
   */
  private openConfirmationDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Click "Yes" button if you want to book selected items'
      }
    });

    return dialogRef.afterClosed();
  }

  /**
   * Removes all selected items from shopping-cart.
   * @param items - to be deleted.
   */
  removeAll(items): void {
    this.cartService.removeItems(items);
  }

  /**
   * Adds or increases cart with the given element.
   * @param element - to be add/increased.
   */
  addToCart(element): void {
    this.cartService.addItem(element);
  }

  /**
   * Removes or subtracts the given element from cart.
   * @param element - to be removed/subtracted.
   */
  subFromCart(element): void {
    this.cartService.minusItem(element);
  }

  /**
   * For checking if the given element is in cart now.
   * @param element - to be checked.
   */
  isInCart(element): boolean {
    return this.cartService.isInCart(element);
  }

}
