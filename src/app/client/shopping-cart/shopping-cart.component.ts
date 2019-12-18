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

  myItems$: Observable<any>;

  displayedColumns = ['Name', 'Count', 'Pharmacy', 'Controls'];

  constructor(
    private cartService: ShoppingCartService,
    private notifications: NotificationService,
    private bookingsService: BookingsService,
    private dialog: MatDialog
  ) { 
    this.myItems$ = this.cartService.getCurrentCart();
  }

  bookItems(items): void {
    this.openConfirmationDialog()
      .pipe(take(1))
      .subscribe(
        (isConfirmed) => {
          if (isConfirmed) {
            this.cartService.bookItems(items);
            this.removeAll(items);
            this.notifications.showSuccess('Alright, your medicine products will be prepared as soon as possible', 'Booked');
            this.bookingsService.subMedicinesFromDb(items);
          }
        }
      );
  }

  private openConfirmationDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Click "Yes" button if you want to book selected items'
      }
    });

    return dialogRef.afterClosed();
  }

  removeAll(items): void {
    for (const item of items) {
      this.cartService.removeItem(item);
    }
  }

  addToCart(element): void {
    this.cartService.addItem(element);
  }

  subFromCart(element): void {
    this.cartService.minusItem(element);
  }

  isInCart(element): boolean {
    return this.cartService.isInCart(element);
  }

}
