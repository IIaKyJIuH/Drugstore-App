import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/core/services/data/statistics.service';
import { UserStatisticsModel } from '../../core/services/models/statistics/user-statistics-model';

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.css']
})
export class UsersStatisticsComponent {

  usersStatistics$: Observable<UserStatisticsModel[]>;

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.usersStatistics$ = statisticsService.getUsersStatistics()
      .pipe(
        map((users: UserStatisticsModel[]) => {
          return users
            .filter(x => x.purchasesAmount !== 0)
            .sort((a, b) => b.purchasesAmount - a.purchasesAmount)
            .slice(0, 5);
        })
      );
  }

}
