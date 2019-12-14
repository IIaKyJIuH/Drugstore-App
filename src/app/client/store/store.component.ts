import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
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
  setMatSortFlag = new BehaviorSubject<boolean>(false);

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private ngxPermissions: NgxPermissionsService,
    private ngxRoles: NgxRolesService,
    private dataService: DataService,
    private shoppingCart: ShoppingCartService,
  ) {
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.medicines$ = this.dataService.getAllMedicines().pipe(
      tap(data => {
        for (const [pharmacyIndex, pharmacy] of Object.keys(data.pharmacies).entries()) { // Прибавляем новые поля к каждому элементу из аптек
          this.dataSource.data.push(data.pharmacies[pharmacy].map((object, id) => {
            return Object.assign(object, {
              pharmacyIndex,
              id
            });
          }));
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
    console.log(row);
  }

  ngAfterViewChecked(): void {
    if (this.setMatSortFlag.getValue()) { // Для решения проблемы с matSort в *ngIf
      this.dataSource.sort = this.sort;
      this.setMatSortFlag.next(false);
      this.setMatSortFlag.complete();
    }
  }

}
