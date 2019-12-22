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

  /**
   * Concatenates key fields and pharmacy name from db to each item.
   * @param pharmacies - object where key - next pharmacy.
   */
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

  /**
   * Concatenates key fields and pharmacy name from db to each item.
   * @param dtoArr - to be converted.
   */
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

  /**
   * .ctor
   * @param database - for interacting with db.
   * @param authService - for getting user auth info.
   */
  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService,
  ) { }

  /**
   * Gets all medicines from all pharmacies.
   * @return concatenated pharmacies array flow.
   */
  getAllMedicines(): Observable<MedicineModel[]> {
    return this.database.object('/medicines/pharmacies').valueChanges()
      .pipe(
        map(records => {
          const dtoArr: MedicineDto[] = DataService.mapObjectToArray(records);
          return DataService.mapDtoArrayToModelArray(dtoArr);
        })
      );
  }

  /**
   * Moves specific medicine to another pharmacy.
   * @param pharmacyName - new point for medicine
   * @param medicine - to be moved.
   */
  moveToAnotherPharmacy(pharmacyName: string, medicine: MedicineModel): void {
    this.addMedicineToDb(pharmacyName, medicine);
    this.deleteMedicineFromDb(medicine);
  }

  /**
   * Adds medicine to db.....TODO: do it.
   * @param to
   * @param medicine
   */
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

  /**
   * Removes medicine from db.
   * @param medicine - to be removed.
   */
  deleteMedicineFromDb(medicine: MedicineModel): void {
    this.database.list(`/medicines/pharmacies/${medicine.pharmacy}/${medicine.key}`).remove();
  }

}
