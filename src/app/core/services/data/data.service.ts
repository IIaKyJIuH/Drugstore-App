import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private authService: AuthenticationService
  ) { }

  hasRole(appropriateRoles: string[]): boolean {
    return appropriateRoles.includes(this.authService.getUserData().role);
  }

  
}
