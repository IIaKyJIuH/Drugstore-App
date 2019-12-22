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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** with medicines saved by user.
 ***REMOVED*****REMOVED***/
  currentCart$ = new BehaviorSubject<MedicineModel[]>([]);

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param database - for interacting with db.
 ***REMOVED*****REMOVED*** @param bookingsService - for booking medicines from cart.
 ***REMOVED*****REMOVED*** @param authService - for getting user auth data.
 ***REMOVED*****REMOVED***/
  constructor(
    private database: AngularFireDatabase,
    private bookingsService: BookingsService,
    private authService: AuthenticationService
  ) {
    // this.currentCart$ = this.database.object('/cart/users').valueChanges()
    //   .pipe(
    //     map(recordings => {
    //       const currentEmail = this.authService.getUserData().email + 'u';
    //       let returnedUser = {***REMOVED***
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For booking medicines via bookingsService.
 ***REMOVED*****REMOVED*** @param medicines - to be booked.
 ***REMOVED*****REMOVED***/
  bookMedicines(medicines: MedicineModel[]): void {
    // this.database.object('/bookings/users').valueChanges()
    //   .pipe(
    //     take(1),
    //     map(recordings => {
    //       const currentEmail = this.authService.getUserData().email;
    //       let returnedUser = {***REMOVED***
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Pluses medicine counter in the cart.
 ***REMOVED*****REMOVED*** @param medicine - to be increased.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Adds medicine to existing cart or creates new cart with that medicine.
 ***REMOVED*****REMOVED*** @param medicine - to be added.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Minuses medicine amount from existing cart or deletes it if that is the last.
 ***REMOVED*****REMOVED*** @param medicine - to be minused.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Removes medicine from existing cart.
 ***REMOVED*****REMOVED*** @param medicine - to be minused.
 ***REMOVED*****REMOVED***/
  removeItem(medicine: MedicineModel): void {
    // this.database.list('/cart/users');
    const currentCart = this.currentCart$.getValue();
    if (currentCart) {
      for (let i = 0; i < medicine.amount; i++) {
        this.minusItem(medicine);
      }
    }
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Checks if the medicine amount in the cart is less than in db.
 ***REMOVED*****REMOVED*** @param medicine - to be checked on.
 ***REMOVED*****REMOVED***/
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Checks if the medicine is in the cart right now.
 ***REMOVED*****REMOVED*** @param medicine - to be checked.
 ***REMOVED*****REMOVED***/
  isInCart(medicine: MedicineModel): boolean {
    const currentCart = this.currentCart$.getValue();
    if (currentCart) {
      return currentCart.findIndex(x => x.name === medicine.name) !== -1;
    }
    return false;
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Gets current cart.
 ***REMOVED*****REMOVED***/
  getCurrentCart(): Observable<MedicineModel[]> {
    return this.currentCart$.asObservable();
  }

}
