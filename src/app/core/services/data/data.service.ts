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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Concatenates key fields and pharmacy name from db to each item.
  ***REMOVED*** @param pharmacies - object where key - next pharmacy.
  ***REMOVED***/
  private static mapObjectToArray(pharmacies: object): MedicineDto[] {
    const resultArr: MedicineDto[] = [];
    for (const pharmacyName of Object.keys(pharmacies)) {
      const pharmacy = pharmacies[pharmacyName];
      for (const key of Object.keys(pharmacy)) {
        const medicine = pharmacy[key];
        if (medicine) {
          resultArr.push(Object.assign(medicine, {
            pharmacy: pharmacyName,
            key
          } as MedicineDto));
        }
      }
    }
    return resultArr;
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Concatenates key fields and pharmacy name from db to each item.
  ***REMOVED*** @param dtoArr - to be converted.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param database - for interacting with db.
  ***REMOVED*** @param authService - for getting user auth info.
  ***REMOVED***/
  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService,
  ) { }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all medicines from all pharmacies.
  ***REMOVED*** @return concatenated pharmacies array flow.
  ***REMOVED***/
  getAllMedicines(): Observable<MedicineModel[]> {
    return this.database.object('/medicines/pharmacies').valueChanges()
      .pipe(
        map((records: object) => {
          if (records) {
            const dtoArr: MedicineDto[] = DataService.mapObjectToArray(records);
            return DataService.mapDtoArrayToModelArray(dtoArr);
          } else {
            return [];
          }
        })
      );
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Moves specific medicine to another pharmacy.
  ***REMOVED*** @param pharmacyName - new point for medicine
  ***REMOVED*** @param medicine - to be moved.
  ***REMOVED***/
  moveToAnotherPharmacy(pharmacyName: string, medicine: MedicineModel): void {
    this.addMedicineToDb(pharmacyName, medicine);
    this.deleteMedicineFromDb(medicine);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Adds medicine to specific pharmacy in db.
  ***REMOVED*** @param to - where to add.
  ***REMOVED*** @param medicine - what medicine to add.
  ***REMOVED***/
  private addMedicineToDb(to: string, medicine: MedicineModel): void {
    const newObj: any = Object.assign({}, {
      count: medicine.amount,
      term: medicine.name
    });
    this.database.list(`medicines/pharmacies/${to}`).push(newObj);
  }

  // TODO: do it.
  editMedicine(pharmacy: string, medicine: string): void {
    const item = this.database.list(`/medicines/pharmacies/${pharmacy}/${medicine}`);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Removes medicine from db.
  ***REMOVED*** @param medicine - to be removed.
  ***REMOVED***/
  deleteMedicineFromDb(medicine: MedicineModel): void {
    this.database.list(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}`).remove();
  }

}
