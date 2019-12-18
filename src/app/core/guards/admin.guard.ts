import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NotificationService } from '../services/notification/notification.service';

***REMOVED****
***REMOVED*** Admin guard service.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

  public constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notifications: NotificationService,
  ) {}

 ***REMOVED*****REMOVED****
  ***REMOVED*** Guard function to choose allow access or not.
  ***REMOVED***/
  public canLoad(): Observable<boolean> {
    return of(this.authService.getUserData().role)
      .pipe(
        map(role => role === 'ADMIN'),
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/home']);
          }
        })
      );
  }

}
