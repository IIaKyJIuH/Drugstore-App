import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatListModule, MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';


/**
 * @inheritdoc
 */
@NgModule({
  declarations: [SidenavListComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    SidenavListComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
