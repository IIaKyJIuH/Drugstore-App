import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';



@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
