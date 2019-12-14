import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DataFormComponent } from './client/data-form/data-form.component';
import { DetailedMedicineComponent } from './client/detailed-medicine/detailed-medicine.component';
import { HomeComponent } from './client/home/home.component';
import { StoreComponent } from './client/store/store.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { WrongPathComponent } from './client/wrong-path/wrong-path.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
     redirectTo: 'home',
     pathMatch: 'full',
***REMOVED***
  {
    path: 'home',
    component: HomeComponent,
***REMOVED***
  {
    path: 'authentication',
    component: DataFormComponent,
***REMOVED***
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [
      AuthGuard,
      NgxPermissionsGuard
    ],
    data: {
      permissions: {
        only: ['ADMIN', 'USER']
      }
    }
***REMOVED***
  {
    path: 'store/:pharmacy/:medicineId',
    component: DetailedMedicineComponent,
    data: {
      permissions: {
        only: 'USER'
      }
    }
***REMOVED***
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [
      NgxPermissionsGuard
    ],
    data: {
      permissions: {
        only: 'USER'
      }
    }    
***REMOVED***
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then(mod => mod.AdminModule),
***REMOVED***
  { path: '**', component: WrongPathComponent },
];

***REMOVED****
***REMOVED*** @inheritdoc
***REMOVED***/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
