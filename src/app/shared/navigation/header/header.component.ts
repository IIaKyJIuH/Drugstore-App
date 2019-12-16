import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

***REMOVED****
***REMOVED*** Header for tablets and desktops.
***REMOVED***/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For opening sidenav-list component according to the window list.
 ***REMOVED*****REMOVED***/
  @Output() public sidenavOpen = new EventEmitter();

  isAuthenticated$: Observable<boolean>;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param authService - for authentication purposes. 
 ***REMOVED*****REMOVED*** @param router - responsible for redirecting user.
 ***REMOVED*****REMOVED***/
  constructor(
    public authService: AuthenticationService,
    private router: Router,
  ) {
    this.isAuthenticated$ = this.authService.getAuthStatus();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Emits sidenav component opener.
 ***REMOVED*****REMOVED***/
  public onSidenavOpen(): void {
    this.sidenavOpen.emit();
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For reactive sign out of the user.
 ***REMOVED*****REMOVED***/
  public signOut(): void {
    this.authService.signOut().pipe(take(1)).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For getting current email.
 ***REMOVED*****REMOVED*** @return authorized user email.
 ***REMOVED*****REMOVED***/
  currentUserEmail(): string {
    return this.authService.getUserData().email;
  }

}
