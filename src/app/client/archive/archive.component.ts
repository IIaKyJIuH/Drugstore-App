import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArchiveService } from 'src/app/core/services/data/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {

  allTransactions$: Observable<any>;

  constructor(
    private archiveService: ArchiveService
  ) {
    this.allTransactions$ = archiveService.getAllTransactions()
      .pipe(
        map(transactions => {
          return transactions.sort((a, b) => b.date.localeCompare(a.date));
        })
      );
  }

}
