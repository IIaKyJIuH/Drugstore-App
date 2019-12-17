import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';



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
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
