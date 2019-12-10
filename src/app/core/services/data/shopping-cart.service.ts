import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  collection$ = new BehaviorSubject<any>([]);

  constructor() { }

  addItem(obj: any): void {

  }

  removeItem(obj: any): void {
    const filtered = this.collection$.getValue();
    filtered = filtered.splice(f,)
  }
}
