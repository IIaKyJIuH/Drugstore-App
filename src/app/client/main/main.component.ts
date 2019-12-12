import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data/data.service';

***REMOVED****
***REMOVED*** Main app page.
***REMOVED***/
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewChecked {

  medicines$: Observable<Array<{}>>;

  displayedColumns: string[] = ['pharmacy', 'term', 'count'];
  setMatSortFlag = new BehaviorSubject<boolean>(false);

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private ngxPermissions: NgxPermissionsService,
    private dataService: DataService,
    private database: AngularFireDatabase,
    private 
  ) {
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.medicines$ = this.database.list('/medicines').valueChanges().pipe(
      tap(data => {
        for (const [index, pharmacy] of (data[0] as Array<[]>).entries()) { // Прибавляем название аптеки к каждому объекту
          this.dataSource.data.push(pharmacy.map((object, id) => {
            return Object.assign(object, {
              pharmacy: index+1,
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
    console.log(id);
  }

  ngAfterViewChecked(): void {
    if (this.setMatSortFlag.getValue()) { // Для решения проблемы с matSort в***REMOVED***ngIf
      this.dataSource.sort = this.sort;
      this.setMatSortFlag.next(false);
      this.setMatSortFlag.complete();
    }
  }

}
