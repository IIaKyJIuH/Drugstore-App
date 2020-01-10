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

  staffStatistics$: Observable<PeopleStatisticsModel[]>;

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
