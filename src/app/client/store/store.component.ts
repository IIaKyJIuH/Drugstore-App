import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
export class StoreComponent implements AfterViewChecked {

  medicines$: Observable<Array<{}>>;

  displayedColumns: string[] = ['pharmacy', 'term', 'count', 'controls'];
  pharmaciesList: string[] = [];
  setMatSortFlag = new BehaviorSubject<boolean>(false);

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dataService: DataService,
    private shoppingCart: ShoppingCartService,
  ) {
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.medicines$ = this.dataService.getAllMedicines().pipe(
      tap((data: any) => {
        for (const pharmacy of Object.keys(data.pharmacies)) { // Прибавляем новые поля к каждому элементу из аптек
          this.pharmaciesList.push(pharmacy);
          for (const key of Object.keys(data.pharmacies[pharmacy])) {
            this.dataSource.data.push(Object.assign(data.pharmacies[pharmacy][key], {
              pharmacy,
              key
            }));
          }
        }
        let concatArray = [];
        for (const eachArr of this.dataSource.data) { // Сводим массивы всех аптек в один
          concatArray = concatArray.concat(eachArr);
        }
        this.dataSource.data = concatArray;
        this.dataSource.paginator = this.paginator;
        this.setMatSortFlag.next(true);
      })
    );
  }

  onItemClicked(id: number) {
    
  }

  bookItem(element): void {
    this.shoppingCart.addItem(element);
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

  ngAfterViewChecked(): void {
    if (this.setMatSortFlag.getValue()) { // Для решения проблемы с matSort в *ngIf
      this.dataSource.sort = this.sort;
      this.setMatSortFlag.next(false);
      this.setMatSortFlag.complete();
    }
  }

}
