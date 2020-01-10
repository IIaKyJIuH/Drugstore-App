import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/core/services/data/statistics.service';
import { MedicineStatisticsModel } from '../../core/services/models/statistics/medicine-statistics-model';

@Component({
  selector: 'app-medicines-statistics',
  templateUrl: './medicines-statistics.component.html',
  styleUrls: ['./medicines-statistics.component.css']
})
export class MedicinesStatisticsComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Statistics about top 'n' bought medicines.
  ***REMOVED***/
  medicinesStatistics$: Observable<MedicineStatisticsModel[]>;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param statisticsService - for getting statistics data.
  ***REMOVED***/
  constructor(
    private statisticsService: StatisticsService
  ) {
    this.medicinesStatistics$ = statisticsService.getMedicinesStatistics()
      .pipe(
        map((medicines: MedicineStatisticsModel[]) => {
          return medicines
            .filter(x => x.purchasesAmount !== 0)
            .sort((a, b) => b.purchasesAmount - a.purchasesAmount)
            .slice(0, 3); // For TOP n listing
        })
      );
  }

}
