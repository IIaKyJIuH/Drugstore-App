import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DataFormComponent } from './data-form/data-form.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WrongPathComponent } from './wrong-path/wrong-path.component';


/**
 * @inheritdoc
 */
@NgModule({
  declarations: [
    HomeComponent,
    DataFormComponent,
    WrongPathComponent,
    MainComponent,
    UserProfileComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule { }
