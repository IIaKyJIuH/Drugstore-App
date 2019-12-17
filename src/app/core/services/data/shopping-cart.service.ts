import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  currentCart$ = new BehaviorSubject<any>([]);

  constructor(
    private database: AngularFireDatabase,
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
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart) {
      this.currentCart$.next(JSON.parse(localStorage.getItem('cart')));
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
      this.currentCart$.next([]);
    }
  }

  bookItems(items): void {
    this.database.object('/bookings/users').valueChanges()
      .pipe(
        take(1),
        map(recordings => {
          const currentEmail = this.authService.getUserData().email;
          let returnedUser = {};
          let isFound = false;
          for (const recordKey of Object.keys(recordings)) {
            const curUser = recordings[recordKey];
            if (curUser.email === currentEmail) {
              returnedUser = Object.assign({}, {
                items: curUser.items,
                recordKey
              });
              isFound = true;
              break;
            }
          }
          console.log('isFound', isFound);
          if (!isFound) {
            this.database.list('/bookings/users/').push({ email: currentEmail, items});
          }
          return returnedUser;
        }),
      ).subscribe();
  }

  private plusItem(obj: any): void {
    const currentCart = this.currentCart$.getValue();
    const existingObjIndex = currentCart.findIndex(x => x.term === obj.term);
    if (existingObjIndex === -1) {
      currentCart.push(obj);
      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.currentCart$.next(currentCart);
    } else {
      currentCart[existingObjIndex].count++;
      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.currentCart$.next(currentCart);
    }
  }

  addItem(obj: any): void {
    // this.database.list('/cart/users').push(obj);
    const copiedObj = Object.assign({}, obj);
    copiedObj.count = 1;
    const currentCart = localStorage.getItem('cart');
    if (currentCart) {
      this.plusItem(copiedObj);
    } else {
      localStorage.setItem('cart', JSON.stringify([copiedObj]));
      this.currentCart$.next([copiedObj]);
    }
  }

  minusItem(obj: any): void {
    // this.database.list('/cart/users');
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart) {
      const existingObjIndex = currentCart.findIndex(x => x.term === obj.term);
      if (existingObjIndex === -1) {
        return;
      }
      if (currentCart[existingObjIndex].count === 1) {
        currentCart.splice(existingObjIndex, 1);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        this.currentCart$.next(currentCart);
      } else {
        currentCart[existingObjIndex].count--;
        localStorage.setItem('cart', JSON.stringify(currentCart));
        this.currentCart$.next(currentCart);
      }
    }
  }

  removeItem(obj: any): void {
    // this.database.list('/cart/users');
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart) {
      for (let i = 0; i < obj.count; i++) {
        this.minusItem(obj);
      }
    }
  }

  isInCart(element): boolean {
    const currentCart = this.currentCart$.getValue();
    if (currentCart) {
      return currentCart.findIndex(x => x.term === element.term) !== -1 ? true : false;
    }
    return false;
  }

  getCurrentCart(): Observable<any> {
    return this.currentCart$.asObservable();
  }

}
