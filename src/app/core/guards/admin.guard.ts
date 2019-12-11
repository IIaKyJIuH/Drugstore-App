import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NotificationService } from '../services/notification/notification.service';

/**
 * Admin guard service.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

  public constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notifications: NotificationService,
  ) {}

  /**
   * Guard function to choose allow access or not.
   */
  public canLoad(): boolean {
    if (this.authService.getUserData().role === 'ADMIN') {
      return true;
    }
    this.notifications.showError('You don`t have admin privilegies', 'Authentication error');
    this.router.navigate(['/home']);
    return false;
  }

}
