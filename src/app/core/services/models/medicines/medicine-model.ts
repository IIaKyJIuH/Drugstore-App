export class MedicineModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Medicine official name
 ***REMOVED*****REMOVED***/
  name: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many times are this medicine in the db.
 ***REMOVED*****REMOVED***/
  amount: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all MedicineModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<MedicineModel>) {
    this.name = data.name;
    this.amount = data.amount;
  }
}
