import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AuthenticationService } from './core/services/authentication/authentication.service';

/**
 * Main Angular component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private fbAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private ngxPermissionsService: NgxPermissionsService,
    private ngxRolesService: NgxRolesService,
  ) {}

  ngOnInit(): void {
    const permissions = ['watchStaffList', 'watchMedicines', 'watchArchive', 'watchClientQueries', 'bookMedicines', 'editEmail', 'modifyMedicines'];
    this.ngxPermissionsService.loadPermissions(permissions);
    this.ngxRolesService.addRoles({
      'ADMIN': permissions,
      'STAFF': [
        'watchArchive',
        'watchClientQueries'
      ],
      'USER': [
        'watchMedicines',
        'bookMedicines'
      ]
    });
  }
}
