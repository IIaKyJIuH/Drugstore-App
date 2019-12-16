import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data/data.service';
import { ShoppingCartService } from 'src/app/core/services/data/shopping-cart.service';

/**
 * Main app page.
 */
@Component({
  selector: 'app-main',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements AfterViewInit {

  medicines$: Observable<MatTableDataSource<any>>;

  displayedColumns: string[] = ['pharmacy', 'term', 'count', 'controls'];
  pharmaciesList: string[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('filter', { static: false}) filter: ElementRef;

  constructor(
    private router: Router,
    private dataService: DataService,
    private shoppingCart: ShoppingCartService,
  ) {}

  getAllMedicines(): Observable<MatTableDataSource<any>> {
    return this.dataService.getAllMedicines().pipe(
      map((data: any) => {
        const dataArr = new MatTableDataSource<any>();
        for (const pharmacy of Object.keys(data.pharmacies)) { // Прибавляем новые поля к каждому элементу из аптек
          if (!this.pharmaciesList.includes(pharmacy)) {
            this.pharmaciesList.push(pharmacy);
          }
          for (const key of Object.keys(data.pharmacies[pharmacy])) {
            dataArr.data.push(Object.assign(data.pharmacies[pharmacy][key], {
              pharmacy,
              key
            }));
          }
        }
        dataArr.paginator = this.paginator;
        dataArr.sort = this.sort;
        dataArr.filterPredicate = (element: any, filter: string) => element.term.startsWith(filter);
        return dataArr;
      })
    );
  }

  addToCart(element): void {
    this.shoppingCart.addItem(element);
  }

  subFromCart(element): void {
    this.shoppingCart.removeItem(element);
  }

  isInCart(element): boolean {
    return this.shoppingCart.isInCart(element);
  }

  goToDetailedInfo(row): void {
    this.router.navigate(['/store', row.pharmacy, row.id]);
  }

  moveToPharmacy(element, option: string): void {
    if (element.pharmacy === option) {
      alert('select appropriate option')
      return;
    }
    if (option === undefined) {
      return;
    }
    this.dataService.moveToAnotherPharmacy(option, element);
  }

  deleteFromDb(element): void {
    this.dataService.deleteMedicineFromDb(element);
  }

  ngAfterViewInit(): void {
    const startingKeyboardEvent = new KeyboardEvent("keyup", {
      bubbles : true,
      cancelable : true,
      key : "just for activating fromEvent",
      shiftKey : true,
    }); 
    this.filter.nativeElement.dispatchEvent(startingKeyboardEvent); // For setting target to this event
    this.medicines$ = fromEvent(this.filter.nativeElement, 'keyup').pipe(
      startWith(startingKeyboardEvent),
      switchMap((event: any) => {
        return this.getAllMedicines().pipe(
          map((data: any) => {
            data.filter = event.target.value;
            return data;
          })
        );
      })
    )
  }

}
