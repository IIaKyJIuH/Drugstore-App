import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { UserFormComponent } from './user-form/user-form';
import { WrongPathComponent } from './wrong-path/wrong-path.component';


***REMOVED****
***REMOVED*** @inheritdoc
***REMOVED***/
@NgModule({
  declarations: [
    HomeComponent,
    UserFormComponent,
    WrongPathComponent,
    MainComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule { }
