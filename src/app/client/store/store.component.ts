import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class StoreComponent {

  medicines$: Observable<MatTableDataSource<any>>;

  displayedColumns: string[] = ['pharmacy', 'term', 'count', 'controls'];
  pharmaciesList: string[] = [];

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
        return dataArr;
      })
    );
  }

  onItemClicked(id: number) {
    
  }

  bookItem(element): void {
    this.shoppingCart.addItem(element);
  }

  unBookItem(element): void {
    this.shoppingCart.removeItem(element);
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

}
