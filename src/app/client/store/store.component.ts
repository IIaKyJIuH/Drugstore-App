import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { ShoppingCartService } from 'src/app/core/services/data/shopping-cart.service';
import { MedicineModel } from '../../core/services/models/medicines/medicine-model';

/**
 * Main app page.
 */
@Component({
  selector: 'app-main',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements AfterViewInit {

  /**
   * All medicines from db.
   */
  medicines$: Observable<MatTableDataSource<any>>;

  displayedColumns: string[] = ['pharmacy', 'name', 'amount', 'controls']; // For mat-table.
  pharmaciesList: string[] = []; // for admin table.

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator; // For pagination of the table.
  @ViewChild(MatSort, { static: false }) sort: MatSort; // For sorting specific columns of the table.
  @ViewChild('filter', { static: false}) filter: ElementRef; // For filtering data by given key.

  /**
   * .ctor
   * @param router - for redirecting user.
   * @param dataService - for getting data from db.
   * @param shoppingCart - for adding/removing data to shopping cart.
   * @param authService - for getting current auth data.
   */
  constructor(
    private router: Router,
    private dataService: DataService,
    private shoppingCart: ShoppingCartService,
    private authService: AuthenticationService,
  ) {}

  /**
   * Gets all medicines from db.
   */
  getAllMedicines(): Observable<MatTableDataSource<any>> {
    return this.dataService.getAllMedicines().pipe(
      map((medicines: MedicineModel[]) => {
        const dataArr = new MatTableDataSource<any>();
        for (const medicine of medicines) { // Прибавляем новые поля к каждому элементу из аптек
          if (!this.pharmaciesList.includes(medicine.pharmacy)) {
            this.pharmaciesList.push(medicine.pharmacy);
          }
          if (medicine.amount !== 0) {
            dataArr.data.push(Object.assign({}, medicine));
          }
        }
        return dataArr;
      })
    );
  }

  /**
   * Adds/increases given element to shopping cart.
   * @param element - to be added/increased.
   */
  addToCart(element): void {
    this.shoppingCart.addItem(element);
  }

  /**
   * Removes/subtracts given element from shopping cart.
   * @param element - to be removed/subtracted.
   */
  subFromCart(element): void {
    this.shoppingCart.minusItem(element);
  }

  /**
   * Checks if the given element amount in the cart is less than in db.
   * @param element - to be checked on.
   */
  isEnough(element): boolean {
    return this.shoppingCart.isEnough(element);
  }

  /**
   * Checks if the given element is in the cart right now.
   * @param element - to be checked.
   */
  isInCart(element): boolean {
    return this.shoppingCart.isInCart(element);
  }

  goToDetailedInfo(row): void {
    this.router.navigate(['/store', row.pharmacy, row.id]);
  }

  /**
   * ADMIN! Moves given element to another pharmacy of the db.
   * @param element - to be moved.
   * @param option - new place for element.
   */
  moveToPharmacy(element, option: string): void {
    if (element.pharmacy === option) {
      alert('select appropriate option');
      return;
    }
    if (option === undefined) {
      return;
    }
    this.dataService.moveToAnotherPharmacy(option, element);
  }

  /**
   * ADMIN! Deletes given element from db.
   * @param element - to be removed.
   */
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
            data.paginator = this.paginator;
            setTimeout(() => {data.sort = this.sort;}, 0); // For dealing with ngIf problem
            data.filterPredicate = (element: MedicineModel, filter: string) => element.name.startsWith(filter);
            if (this.authService.getUserData().role === 'ADMIN') {
              (this.filter.nativeElement as HTMLInputElement).parentElement.parentElement.remove();
            }
            return data;
          })
        );
      })
    )
  }

}
