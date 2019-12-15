import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgxRolesService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NotificationService } from '../services/notification/notification.service';

***REMOVED****
***REMOVED*** Guard for user routing through app.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param authService - for checking auth status.
  ***REMOVED*** @param router - responsible for redirecting user.
  ***REMOVED***/
  public constructor(
    private authService: AuthenticationService,
    private ngxRoles: NgxRolesService,
    private notifications: NotificationService,
    private router: Router,
  ) {}

 ***REMOVED*****REMOVED****
  ***REMOVED*** Implemented method
  ***REMOVED***/
  public canActivate(): Observable<boolean> {
    return this.authService.getAuthStatus().pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.setRole();
          return true;
        } else {
          this.router.navigate(['/home']);
          this.notifications.showWarning('Firstly you need to login to firebase', 'Warning');
          return false;
        }
      })
    );
  }

  public setRole(): void {
    this.ngxRoles.addRole(this.authService.getUserData().role, () => true);
  }
}
