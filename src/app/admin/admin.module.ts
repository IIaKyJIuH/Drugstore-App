import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserStatiscticsComponent } from './user-statisctics/user-statisctics.component';
import { StaffStatiscticsComponent } from './staff-statisctics/staff-statisctics.component';


/**
 * Admin main module.
 */
@NgModule({
  declarations: [AdminComponent, UserStatiscticsComponent, StaffStatiscticsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule
  ],
})
export class AdminModule { }
