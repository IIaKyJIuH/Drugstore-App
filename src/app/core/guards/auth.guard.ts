import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NotificationService } from '../services/notification/notification.service';

/**
 * Guard for user routing through app.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
   * .ctor
   * @param authService - for checking auth status.
   * @param router - responsible for redirecting user.
   */
  public constructor(
    private authService: AuthenticationService,
    private notifications: NotificationService,
    private router: Router,
  ) {}

  /**
   * Implemented method
   */
  public canActivate(): boolean {
    let isAuthenticated = false;
    this.authService.isAuthenticated.pipe(take(1)).subscribe(
      (authState: boolean) => {
        if (authState) {
          isAuthenticated = true;
        } else {
          this.router.navigate(['/home']);
          this.notifications.showWarning('Firstly you need to login to firebase', 'Warning');
        }
      }
    );
    return isAuthenticated;
  }
}
