import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from './core/services/authentication/authentication.service';

/**
 * Main Angular component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private fbAuth: AngularFireAuth,
    private authService: AuthenticationService,
  ) {
    localStorage.setItem('isAdmin', 'false');
  }

  /**
   * For toggling admin status. WILL BE FIXED LATER.
   */
  public toggleAdminStatus(): void {
    // this.fbAuth.this.authService.USER_UID
    const toggling = localStorage.getItem('isAdmin') === 'false' ? true : false;
    localStorage.setItem('isAdmin', toggling.toString());
  }
}
