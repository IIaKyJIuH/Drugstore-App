import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private authService: AuthenticationService,
    private database: AngularFireDatabase
  ) { }

  hasRole(appropriateRoles: string[]): boolean {
    return appropriateRoles.includes(this.authService.getUserData().role);
  }

  getAllMedicines(): Observable<any> {
    return this.database.object('/medicines').valueChanges();
  }

  editMedicine(pharmacy: number, medicine: number): void {
    const item = this.database.list(`/medicines/list/${pharmacy}/${medicine}`);
  }
  
}
