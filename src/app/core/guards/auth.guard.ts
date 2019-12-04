import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';

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
    private router: Router,
  ) {}

  /**
   * Implemented method
   */
  public canActivate(): boolean {
    let isAuthenticated = false;
    this.authService.isAuthenticated().pipe(take(1)).subscribe(
      (authState: boolean) => {
        if (authState) {
          isAuthenticated = true;
        } else {
          this.router.navigate(['/home']);
          alert('Firstly you need to login as firebase user');
        }    
      }
    );
    return isAuthenticated;
  }
}
