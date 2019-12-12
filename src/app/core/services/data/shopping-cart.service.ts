import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  collection$ = new BehaviorSubject<any>([]);

  constructor() { }

  addItem(obj: any): void {
    const currentList = this.collection$.getValue();
    this.collection$.next([...currentList, obj]);
  }

  removeItem(obj: any): void {
    const filtered = this.collection$.getValue();
    const objIndex = filtered.indexOf(obj);
    // filtered = filtered.splice(f,)
  }
}
