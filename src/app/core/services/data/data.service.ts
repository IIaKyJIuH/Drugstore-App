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
    return this.database.object('/medicines/pharmacies').valueChanges();
  }

  moveToAnotherPharmacy(pharmacy: string, medicine: object): void {
    this.addMedicineToDb(pharmacy, medicine);
    this.deleteMedicineFromDb(medicine);
  }

  private addMedicineToDb(to: string, medicine: any): void {
    const newObj: any = Object.assign({}, {
      count: medicine.count,
      term: medicine.term
    });
    this.database.list(`medicines/pharmacies/${to}`).push(newObj);
  }

  deleteMedicineFromDb(medicine: any): void {
    this.database.list(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}`).remove();
  }

  editMedicine(pharmacy: string, medicine: string): void {
    const item = this.database.list(`/medicines/pharmacies/${pharmacy}/${medicine}`);
  }
  
}
