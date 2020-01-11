import { MedicineModel } from '../medicines/medicine-model';

export class BookingModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** User who booked medicines.
  ***REMOVED***/
  email: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Booked by user.
  ***REMOVED***/
  medicines: MedicineModel[];

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Tells if the booking is ready to be sold.
  ***REMOVED***/
  isReady: boolean;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all BookingModel fields.
  ***REMOVED***/
  constructor(data: Partial<BookingModel>) {
    this.email = data.email;
    this.medicines = data.medicines;
    this.key = data.key;
    this.isReady = data.isReady;
  }
}
