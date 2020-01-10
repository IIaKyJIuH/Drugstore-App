import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArchiveService } from 'src/app/core/services/data/archive.service';
import { ArchiveModel } from '../../core/services/models/archive/archive-model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Detailed info about each cancelled, failed or succeeded transaction.
  ***REMOVED***/
  allTransactions$: Observable<ArchiveModel[]>;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param archiveService - for getting archive data from db.
  ***REMOVED***/
  constructor(
    private archiveService: ArchiveService
  ) {
    this.allTransactions$ = archiveService.getAllTransactions()
      .pipe(
        map((transactions: ArchiveModel[]) => {
          return transactions.sort((a, b) => b.date.localeCompare(a.date));
        })
      );
  }

}
