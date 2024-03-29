import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { ArchiveComponent } from "./client/archive/archive.component";
import { BookingsComponent } from "./client/bookings/bookings.component";
import { DataFormComponent } from "./client/data-form/data-form.component";
import { DetailedMedicineComponent } from "./client/detailed-medicine/detailed-medicine.component";
import { HomeComponent } from "./client/home/home.component";
import { ShoppingCartComponent } from "./client/shopping-cart/shopping-cart.component";
import { StoreComponent } from "./client/store/store.component";
import { UserProfileComponent } from "./client/user-profile/user-profile.component";
import { WrongPathComponent } from "./client/wrong-path/wrong-path.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "authentication",
    component: DataFormComponent,
  },
  {
    path: "store",
    component: StoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: StoreComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["ADMIN", "USER"],
            redirectTo: "home",
          },
        },
      },
    ],
  },
  {
    path: "store/:pharmacy/:medicineId",
    component: DetailedMedicineComponent,
    data: {
      permissions: {
        only: "USER",
      },
    },
  },
  {
    path: "cart",
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ShoppingCartComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: "USER",
            redirectTo: "home",
          },
        },
      },
    ],
  },
  {
    path: "bookings",
    component: BookingsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: BookingsComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            except: "ADMIN",
            redirectTo: "home",
          },
        },
      },
    ],
  },
  {
    path: "archive",
    component: ArchiveComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ArchiveComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: "STAFF",
            redirectTo: "home",
          },
        },
      },
    ],
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: UserProfileComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: "USER",
          },
        },
      },
    ],
  },
  {
    path: "admin",
    canLoad: [AdminGuard],
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
  },
  { path: "**", component: WrongPathComponent },
];

/**
 * @inheritdoc
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
