import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NgxPermissionsService } from 'ngx-permissions';
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

  medicines$: AngularFireList<any>;

  constructor(
    private ngxPermissions: NgxPermissionsService,
    private dataService: DataService,
    private database: AngularFireDatabase,
  ) { }

  getAllMedicines(): void {
    this.medicines$ = this.database.list('medicines');
  }

}
