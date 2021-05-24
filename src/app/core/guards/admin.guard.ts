import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
