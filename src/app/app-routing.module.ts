import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { MainComponent } from './client/main/main.component';
import { UserFormComponent } from './client/user-form/user-form';
import { WrongPathComponent } from './client/wrong-path/wrong-path.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';


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
    path: 'authentication',
    component: UserFormComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [
      AuthGuard,
    ]
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
