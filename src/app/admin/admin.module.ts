import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MedicinesStatisticsComponent } from './medicines-statistics/medicines-statistics.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffStatisticsComponent } from './staff-statistics/staff-statistics.component';
import { UsersStatisticsComponent } from './users-statistics/users-statistics.component';


***REMOVED****
***REMOVED*** Admin main module.
***REMOVED***/
@NgModule({
  declarations: [AdminComponent, UsersStatisticsComponent, StaffStatisticsComponent, MedicinesStatisticsComponent, StaffEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule
  ],
})
export class AdminModule { }
