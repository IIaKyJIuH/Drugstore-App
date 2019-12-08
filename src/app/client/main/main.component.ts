import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
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
export class MainComponent {

  medicines$: Observable<Array<{}>>;

  displayedColumns: string[] = ['pharmacy', 'term', 'count'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private ngxPermissions: NgxPermissionsService,
    private dataService: DataService,
    private database: AngularFireDatabase,
  ) { 
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.medicines$ = this.database.list('/medicines').valueChanges().pipe(
      tap(data => {
        for (let i = 0; i < 15; i++) {
          this.dataSource.data.push(data[0][0][i]);
        }
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  private flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
***REMOVED*****REMOVED*****REMOVED*** []);
  }

}
