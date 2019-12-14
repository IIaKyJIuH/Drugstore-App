import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DataFormComponent } from './client/data-form/data-form.component';
import { DetailedMedicineComponent } from './client/detailed-medicine/detailed-medicine.component';
import { HomeComponent } from './client/home/home.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
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
      NgxPermissionsGuard
    ],
    data: {
      permissions: {
        only: ['ADMIN', 'USER']
      }
    }
  },
  {
    path: 'store/:pharmacy/:medicineId',
    component: DetailedMedicineComponent,
    data: {
      permissions: {
        only: 'USER'
      }
    }
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'USER'
      }
    }
  },
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
