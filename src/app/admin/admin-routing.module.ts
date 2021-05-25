import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AdminComponent,
  },
];

/**
 * Routings for admin module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
