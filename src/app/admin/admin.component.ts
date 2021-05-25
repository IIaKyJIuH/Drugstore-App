import { Component } from "@angular/core";
import { StatisticsService } from "../core/services/data/statistics.service";

/**
 * Admin`s place.
 */
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent {
  constructor(private statisticsService: StatisticsService) {}
}
