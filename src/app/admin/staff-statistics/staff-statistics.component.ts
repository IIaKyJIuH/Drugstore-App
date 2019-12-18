import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.staffStatistics$ = statisticsService.getStaffStatistics();
  }

}
