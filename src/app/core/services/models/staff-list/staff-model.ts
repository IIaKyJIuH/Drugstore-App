export class StaffModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Staff email.
  ***REMOVED***/
  email: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all StaffModel fields.
  ***REMOVED***/
  constructor(data: Partial<StaffModel>) {
    this.email = data.email;
    this.key = data.key;
  }
}
