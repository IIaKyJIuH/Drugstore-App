import { MedicineModel } from '../medicines/medicine-model';

export class BookingModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** User who booked medicines.
 ***REMOVED*****REMOVED***/
  email: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Booked by user.
 ***REMOVED*****REMOVED***/
  medicines: MedicineModel[];

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all BookingModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<BookingModel>) {
    this.email = data.email;
    this.medicines = data.medicines;
  }
}
