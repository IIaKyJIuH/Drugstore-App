import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Guard function to choose allow access or not.
 ***REMOVED*****REMOVED***/
  public canLoad(): boolean {
    if (this.authService.getUserData().role === 'ADMIN') {
      return true;
    }
    this.notifications.showError('You don`t have admin privilegies', 'Authentication error');
    this.router.navigate(['/home']);
    return false;
  }

}
