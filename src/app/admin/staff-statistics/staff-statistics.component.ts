import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/core/services/data/statistics.service';

@Component({
  selector: 'app-staff-statistics',
  templateUrl: './staff-statistics.component.html',
  styleUrls: ['./staff-statistics.component.css']
})
export class StaffStatisticsComponent {

  staffStatistics$: Observable<any>

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.staffStatistics$ = statisticsService.getStaffStatistics()
      .pipe(
        map(staffList => {
          const filtered = staffList
            .sort((a, b) => b.purchasedItems - a.purchasedItems)
            .slice(0, 1);
          return filtered;
        })
      );
  }

}
