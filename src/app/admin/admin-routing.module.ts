import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminComponent
  }
];

***REMOVED****
***REMOVED*** Routings for admin module.
***REMOVED***/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
