import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/core/services/data/statistics.service';

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.css']
})
export class UsersStatisticsComponent {

  usersStatistics$: Observable<any>

  constructor(
    private statisticsService: StatisticsService
  ) { 
    this.usersStatistics$ = statisticsService.getUsersStatistics()
      .pipe(
        map(users => {
          const filtered = staffList
            .sort((a, b) => b.purchased - a.purchased)
            .slice(0, 1);
          return filtered;
        })
      );
  }

}
