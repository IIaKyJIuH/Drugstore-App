import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DataFormComponent } from './data-form/data-form.component';
import { DetailedMedicineComponent } from './detailed-medicine/detailed-medicine.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WrongPathComponent } from './wrong-path/wrong-path.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


***REMOVED****
***REMOVED*** @inheritdoc
***REMOVED***/
@NgModule({
  declarations: [
    HomeComponent,
    DataFormComponent,
    WrongPathComponent,
    StoreComponent,
    UserProfileComponent,
    DetailedMedicineComponent,
    ShoppingCartComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule { }
