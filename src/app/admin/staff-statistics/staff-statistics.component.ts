import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/core/services/data/statistics.service';
import { PeopleStatisticsModel } from '../../core/services/models/statistics/people-statistics-model';

@Component({
  selector: 'app-staff-statistics',
  templateUrl: './staff-statistics.component.html',
  styleUrls: ['./staff-statistics.component.css']
})
export class StaffStatisticsComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many items sold top 'n' staff.
  ***REMOVED***/
  staffStatistics$: Observable<PeopleStatisticsModel[]>;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param statisticsService - for getting staff statistics.
  ***REMOVED***/
  constructor(
    private statisticsService: StatisticsService
  ) {
    this.staffStatistics$ = statisticsService.getStaffStatistics()
      .pipe(
        map((staffList: PeopleStatisticsModel[]) => {
          return staffList
            .sort((a, b) => b.purchasesAmount - a.purchasesAmount)
            .slice(0, 1);
        })
      );
  }

}
