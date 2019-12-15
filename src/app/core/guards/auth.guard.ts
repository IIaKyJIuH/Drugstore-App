import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param authService - for checking auth status.
 ***REMOVED*****REMOVED*** @param router - responsible for redirecting user.
 ***REMOVED*****REMOVED***/
  public constructor(
    private authService: AuthenticationService,
    private notifications: NotificationService,
    private router: Router,
  ) {}

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Implemented method
 ***REMOVED*****REMOVED***/
  public canActivate(): Observable<boolean> {
    return this.authService.getAuthStatus().pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/home']);
          this.notifications.showWarning('Firstly you need to login to firebase', 'Warning');
          return false;
        }
      })
    );
  }
}
