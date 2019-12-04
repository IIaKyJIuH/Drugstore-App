import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';

***REMOVED****
***REMOVED*** Guard for typical user.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  public constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Implemented method
 ***REMOVED*****REMOVED***/
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
