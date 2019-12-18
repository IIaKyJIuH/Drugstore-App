import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/core/services/data/statistics.service';

@Component({
  selector: 'app-medicines-statistics',
  templateUrl: './medicines-statistics.component.html',
  styleUrls: ['./medicines-statistics.component.css']
})
export class MedicinesStatisticsComponent {

  medicinesStatistics$: Observable<any>

  constructor(
    private statisticsService: StatisticsService
  ) { 
    this.medicinesStatistics$ = statisticsService.getMedicinesStatistics()
      .pipe(
        map(medicines => {
          const filtered = medicines
            .filter(x => x.purchased !== 0)
            .sort((a, b) => b.purchased - a.purchased)
            .slice(0, 3);
          return filtered;
        })
      );
  }

}
