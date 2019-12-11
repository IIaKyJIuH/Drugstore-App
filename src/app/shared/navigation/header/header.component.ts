import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

/**
 * Header for tablets and desktops.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   * For opening sidenav-list component according to the window list.
   */
  @Output() public sidenavOpen = new EventEmitter();

  /**
   * .ctor
   * @param authService - for authentication purposes. 
   * @param router - responsible for redirecting user.
   */
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  /**
   * Emits sidenav component opener.
   */
  public onSidenavOpen(): void {
    this.sidenavOpen.emit();
  }

  /**
   * For reactive sign out of the user.
   */
  public signOut(): void {
    this.authService.signOut().pipe(take(1)).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  /**
   * For getting current email.
   * @return authorized user email.
   */
  get currentUserEmail(): string {
    return this.authService.getUserData().email;
  }

  /**
   * Checks if the user has signed in already.
   * @return auth state flow.
   */
  public isAuthenticated(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

}
