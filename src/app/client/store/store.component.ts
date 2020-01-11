import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { ShoppingCartService } from 'src/app/core/services/data/shopping-cart.service';
import { MedicineModel } from '../../core/services/models/medicines/medicine-model';

***REMOVED****
***REMOVED*** Main app page.
***REMOVED***/
@Component({
  selector: 'app-main',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements AfterViewInit {

 ***REMOVED*****REMOVED****
  ***REMOVED*** All medicines from db.
  ***REMOVED***/
  medicines$: Observable<MatTableDataSource<any>>;

  displayedColumns: string[] = ['pharmacy', 'name', 'amount', 'controls']; // For mat-table.
  pharmaciesList: string[] = []; // for admin table.

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator; // For pagination of the table.
  @ViewChild(MatSort, { static: false }) sort: MatSort; // For sorting specific columns of the table.
  @ViewChild('filter', { static: false}) filter: ElementRef; // For filtering data by given key.

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param router - for redirecting user.
  ***REMOVED*** @param dataService - for getting data from db.
  ***REMOVED*** @param shoppingCart - for adding/removing data to shopping cart.
  ***REMOVED*** @param authService - for getting current auth data.
  ***REMOVED***/
  constructor(
    private router: Router,
    private dataService: DataService,
    private shoppingCart: ShoppingCartService,
    private authService: AuthenticationService,
  ) {}

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all medicines from db.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Adds/increases given medicine to shopping cart.
  ***REMOVED*** @param medicine - to be added/increased.
  ***REMOVED***/
  addToCart(medicine: MedicineModel): void {
    this.shoppingCart.addItem(medicine);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Removes/subtracts given medicine from shopping cart.
  ***REMOVED*** @param medicine - to be removed/subtracted.
  ***REMOVED***/
  subFromCart(medicine: MedicineModel): void {
    this.shoppingCart.minusItem(medicine);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Checks if the given medicine amount in the cart is less than in db.
  ***REMOVED*** @param medicine - to be checked on.
  ***REMOVED***/
  isEnough(medicine: MedicineModel): boolean {
    return this.shoppingCart.isEnough(medicine);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Checks if the given medicine is in the cart right now.
  ***REMOVED*** @param medicine - to be checked.
  ***REMOVED***/
  isInCart(medicine: MedicineModel): boolean {
    return this.shoppingCart.isInCart(medicine);
  }

  goToDetailedInfo(row): void {
    this.router.navigate(['/store', row.pharmacy, row.id]);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** ADMIN! Moves given medicine to another pharmacy of the db.
  ***REMOVED*** @param medicine - to be moved.
  ***REMOVED*** @param option - new place for medicine.
  ***REMOVED***/
  moveToPharmacy(medicine: MedicineModel, option: string): void {
    if (medicine.pharmacy === option) {
      alert('select appropriate option');
      return;
    }
    if (option === undefined) {
      return;
    }
    this.dataService.moveToAnotherPharmacy(option, medicine);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** ADMIN! Deletes given medicine from db.
  ***REMOVED*** @param medicine - to be removed.
  ***REMOVED***/
  deleteFromDb(medicine: MedicineModel): void {
    this.dataService.deleteMedicineFromDb(medicine);
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
