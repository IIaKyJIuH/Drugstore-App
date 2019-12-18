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
          const filtered = users
            .filter(x => x.purchasedItems !== 0)
            .sort((a, b) => b.purchasedItems - a.purchasedItems)
            .slice(0, 5);
          return filtered;
        })
      );
  }

}
