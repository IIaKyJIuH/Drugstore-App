import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { MedicineModel } from '../models/medicines/medicine-model';
import { BookingsService } from './bookings.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  /**
   * with medicines saved by user.
   */
  currentCart$ = new BehaviorSubject<MedicineModel[]>([]);

  /**
   * .ctor
   * @param database - for interacting with db.
   * @param bookingsService - for booking medicines from cart.
   * @param authService - for getting user auth data.
   */
  constructor(
    private database: AngularFireDatabase,
    private bookingsService: BookingsService,
    private authService: AuthenticationService
  ) {
    // this.currentCart$ = this.database.object('/cart/users').valueChanges()
    //   .pipe(
    //     map(recordings => {
    //       const currentEmail = this.authService.getUserData().email + 'u';
    //       let returnedUser = {};
    //       for (const recordKey of Object.keys(recordings)) {
    //         const curUser = recordings[recordKey];
    //         if (curUser.email === currentEmail) {
    //           returnedUser = Object.assign({}, {
    //             items: curUser.items,
    //             recordKey
    //           });
    //         }
    //       }
    //       return returnedUser;
    //     }),
    //     tap(console.log)
    //   );
    const currentCart = localStorage.getItem('cart');
    if (currentCart) {
      this.currentCart$.next(JSON.parse(localStorage.getItem('cart')));
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  /**
   * For booking medicines via bookingsService.
   * @param medicines - to be booked.
   */
  bookMedicines(medicines: MedicineModel[]): void {
    // this.database.object('/bookings/users').valueChanges()
    //   .pipe(
    //     take(1),
    //     map(recordings => {
    //       const currentEmail = this.authService.getUserData().email;
    //       let returnedUser = {};
    //       let isFound = false;
    //       for (const recordKey of Object.keys(recordings)) {
    //         const curUser = recordings[recordKey];
    //         if (curUser.email === currentEmail) {
    //           returnedUser = Object.assign({}, {
    //             items: curUser.items,
    //             recordKey
    //           });
    //           isFound = true;
    //           break;
    //         }
    //       }
    //       if (!isFound) {
    //         this.database.list('/bookings/users/').push({ email: currentEmail, items});
    //       } else {
    //         this.database.list('/bookings/users/').push(items);
    //       }
    //       return returnedUser;
    //     }),
    //   ).subscribe();
    this.bookingsService.bookMedicines(medicines);
  }

  /**
   * Pluses medicine counter in the cart.
   * @param medicine - to be increased.
   */
  private plusItem(medicine: MedicineModel): void {
    const currentCart = this.currentCart$.getValue();
    const existingObjIndex = currentCart.findIndex(x => x.name === medicine.name);
    if (existingObjIndex === -1) {
      currentCart.push(medicine);
      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.currentCart$.next(currentCart);
    } else {
      currentCart[existingObjIndex].amount++;
      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.currentCart$.next(currentCart);
    }
  }

  /**
   * Adds medicine to existing cart or creates new cart with that medicine.
   * @param medicine - to be added.
   */
  addItem(medicine: MedicineModel): void {
    // this.database.list('/cart/users').push(obj);
    const copiedMedicine: MedicineModel = Object.assign({}, medicine);
    copiedMedicine.amount = 1;
    const currentCart = localStorage.getItem('cart');
    if (currentCart) {
      this.plusItem(copiedMedicine);
    } else {
      const newCart = [copiedMedicine];
      localStorage.setItem('cart', JSON.stringify(newCart));
      this.currentCart$.next(newCart);
    }
  }

  /**
   * Minuses medicine amount from existing cart or deletes it if that is the last.
   * @param medicine - to be minused.
   */
  minusItem(medicine: MedicineModel): void {
    // this.database.list('/cart/users');
    const currentCart = this.currentCart$.getValue();
    if (currentCart) {
      const existingObjIndex = currentCart.findIndex(x => x.name === medicine.name);
      if (existingObjIndex === -1) {
        return;
      }
      if (currentCart[existingObjIndex].amount === 1) {
        currentCart.splice(existingObjIndex, 1);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        this.currentCart$.next(currentCart);
      } else {
        currentCart[existingObjIndex].amount--;
        localStorage.setItem('cart', JSON.stringify(currentCart));
        this.currentCart$.next(currentCart);
      }
    }
  }

  /**
   * Removes all medicines from existing cart.
   * @param medicines - to be minused.
   */
  removeItems(medicines: MedicineModel[]): void {
    // this.database.list('/cart/users');
    const newCart = medicines.slice();
    for (const index of medicines.keys()) {
      newCart.splice(index, 1); // will be empty after the last iteration.
    }
    localStorage.setItem('cart', JSON.stringify([]));
    this.currentCart$.next([]);
  }

  /**
   * Checks if the medicine amount in the cart is less than in db.
   * @param medicine - to be checked on.
   */
  isEnough(medicine: MedicineModel): boolean {
    const currentCart = this.currentCart$.getValue();
    if (currentCart) {
      const currentBookedElement = currentCart.find(x => x.name === medicine.name);
      if (currentBookedElement) {
        if (medicine.amount === currentBookedElement.amount) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if the medicine is in the cart right now.
   * @param medicine - to be checked.
   */
  isInCart(medicine: MedicineModel): boolean {
    const currentCart = this.currentCart$.getValue();
    if (currentCart) {
      return currentCart.findIndex(x => x.name === medicine.name) !== -1;
    }
    return false;
  }

  /**
   * Gets current cart.
   */
  getCurrentCart(): Observable<MedicineModel[]> {
    return this.currentCart$.asObservable();
  }

}
