import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { MedicineDto } from '../dtos/medicines/medicine-dto';
import { MedicineModel } from '../models/medicines/medicine-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Concatenates key fields and pharmacy name from db to each item.
 ***REMOVED*****REMOVED*** @param pharmacies - object where key - next pharmacy.
 ***REMOVED*****REMOVED***/
  private static mapObjectToArray(pharmacies: object): MedicineDto[] {
    const resultArr: MedicineDto[] = [];
    for (const pharmacyName of Object.keys(pharmacies)) {
      const pharmacy = pharmacies[pharmacyName];
      for (const [index, medicine] of pharmacy.entries()) {
        resultArr.push(Object.assign(medicine, {
          pharmacy: pharmacyName,
          key: index
        } as MedicineDto));
      }
    }
    return resultArr;
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Concatenates key fields and pharmacy name from db to each item.
 ***REMOVED*****REMOVED*** @param dtoArr - to be converted.
 ***REMOVED*****REMOVED***/
  private static mapDtoArrayToModelArray(dtoArr: MedicineDto[]): MedicineModel[] {
    const resultArr: MedicineModel[] = [];
    for (const dto of dtoArr) {
      resultArr.push(new MedicineModel({
        name: dto.term,
        amount: dto.count,
        pharmacy: dto.pharmacy,
        key: dto.key
      }))
    }
    return resultArr;
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param database - for interacting with db.
 ***REMOVED*****REMOVED*** @param authService - for getting user auth info.
 ***REMOVED*****REMOVED***/
  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService,
  ) { }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Gets all medicines from all pharmacies.
 ***REMOVED*****REMOVED*** @return concatenated pharmacies array flow.
 ***REMOVED*****REMOVED***/
  getAllMedicines(): Observable<MedicineModel[]> {
    return this.database.object('/medicines/pharmacies').valueChanges()
      .pipe(
        map(records => {
          const dtoArr: MedicineDto[] = DataService.mapObjectToArray(records);
          return DataService.mapDtoArrayToModelArray(dtoArr);
        })
      );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Moves specific medicine to another pharmacy.
 ***REMOVED*****REMOVED*** @param pharmacyName - new point for medicine
 ***REMOVED*****REMOVED*** @param medicine - to be moved.
 ***REMOVED*****REMOVED***/
  moveToAnotherPharmacy(pharmacyName: string, medicine: MedicineModel): void {
    this.addMedicineToDb(pharmacyName, medicine);
    this.deleteMedicineFromDb(medicine);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Adds medicine to db.....TODO: do it.
 ***REMOVED*****REMOVED*** @param to
 ***REMOVED*****REMOVED*** @param medicine
 ***REMOVED*****REMOVED***/
  private addMedicineToDb(to: string, medicine: any): void {
    const newObj: any = Object.assign({}, {
      count: medicine.count,
      term: medicine.term
    });
    this.database.list(`medicines/pharmacies/${to}`).push(newObj);
  }

  // TODO: do it.
  editMedicine(pharmacy: string, medicine: string): void {
    const item = this.database.list(`/medicines/pharmacies/${pharmacy}/${medicine}`);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Removes medicine from db.
 ***REMOVED*****REMOVED*** @param medicine - to be removed.
 ***REMOVED*****REMOVED***/
  deleteMedicineFromDb(medicine: MedicineModel): void {
    this.database.list(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}`).remove();
  }

}
