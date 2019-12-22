export class MedicineModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Medicine official name
  ***REMOVED***/
  name: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times are this medicine in the db.
  ***REMOVED***/
  amount: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Pharmacy, from where the medicine.
  ***REMOVED***/
  pharmacy?: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all MedicineModel fields.
  ***REMOVED***/
  constructor(data: Partial<MedicineModel>) {
    this.name = data.name;
    this.amount = data.amount;
    this.key = data.key;
    this.pharmacy = data.pharmacy;
  }
}
