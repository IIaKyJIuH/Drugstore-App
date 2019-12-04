import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.page';
import { SignUpComponent } from './sign-up/sign-up.page';
import { WrongPathComponent } from './wrong-path/wrong-path.component';


***REMOVED****
***REMOVED*** @inheritdoc
***REMOVED***/
@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    WrongPathComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    NgxPermissionsModule.forChild(),
  ],
})
export class ClientModule { }
