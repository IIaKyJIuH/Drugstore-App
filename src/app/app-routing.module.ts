import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { MainComponent } from './client/main/main.component';
import { SignInComponent } from './client/sign-in/sign-in.page';
import { SignUpComponent } from './client/sign-up/sign-up.page';
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
    path: 'sign-in',
    component: SignInComponent,
***REMOVED***
  {
    path: 'sign-up',
    component: SignUpComponent,
***REMOVED***
  {
    path: 'main',
    component: MainComponent,
    canActivate: [
      AuthGuard,
    ]
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
