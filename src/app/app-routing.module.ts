import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './client/data-form/data-form.component';
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
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'authentication',
    component: DataFormComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [
      AuthGuard,
    ],
    children: [
      {
        path: ':id',
        component: DetailedItemComponent
      }
    ]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: {
      permissions: {
        only: 'USER'
      }
    }    
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
