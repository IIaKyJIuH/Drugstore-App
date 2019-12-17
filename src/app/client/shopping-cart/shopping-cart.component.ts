import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/core/services/data/shopping-cart.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  myItems$: Observable<any>;

  objectObj = Object;

  displayedColumns = ['Name', 'Count', 'Pharmacy', 'Controls'];

  constructor(
    private cartService: ShoppingCartService,
    private notifications: NotificationService
  ) { 
    this.myItems$ = this.cartService.getCurrentCart();
  }

  bookItems(items): void {
    this.cartService.bookItems(items);
    this.removeAll(items);
    this.notifications.showSuccess('Alright, your medicine products will be prepared as soon as possible', 'Booked');
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
