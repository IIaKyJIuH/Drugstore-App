import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public signOut(): void {
    this.authService.signOut().pipe(take(1)).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  public currentUser(): string {
    return localStorage.getItem(this.authService.USER_EMAIL);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

}
