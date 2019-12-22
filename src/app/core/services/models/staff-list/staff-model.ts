export class StaffModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Staff email.
 ***REMOVED*****REMOVED***/
  email: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all StaffModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<StaffModel>) {
    this.email = data.email;
  }
}
