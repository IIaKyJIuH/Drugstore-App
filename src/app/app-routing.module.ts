import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { SignInComponent } from './client/sign-in/sign-in.page';
import { WrongPathComponent } from './client/wrong-path/wrong-path.component';
import { AdminGuard } from './core/guards/admin.guard';


const routes: Routes = [
  {
    path: '',
     redirectTo: 'home',
     pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then(mod => mod.AdminModule),
  },
  { path: '**', component: WrongPathComponent },
];

/**
 * @inheritdoc
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
