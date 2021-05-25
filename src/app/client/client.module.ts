import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ArchiveComponent } from "./archive/archive.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { DataFormComponent } from "./data-form/data-form.component";
import { DetailedMedicineComponent } from "./detailed-medicine/detailed-medicine.component";
import { HomeComponent } from "./home/home.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { StoreComponent } from "./store/store.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { WrongPathComponent } from "./wrong-path/wrong-path.component";

/**
 * @inheritdoc
 */
@NgModule({
  declarations: [
    HomeComponent,
    DataFormComponent,
    WrongPathComponent,
    StoreComponent,
    UserProfileComponent,
    DetailedMedicineComponent,
    ShoppingCartComponent,
    BookingsComponent,
    ArchiveComponent,
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ClientModule {}
