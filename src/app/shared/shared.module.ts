import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';


/**
 * @inheritdoc
 */
@NgModule({
  declarations: [SidenavListComponent, HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [
    SidenavListComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
