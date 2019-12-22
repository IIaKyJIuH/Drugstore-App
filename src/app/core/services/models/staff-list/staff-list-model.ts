export class StaffListModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Staff email.
 ***REMOVED*****REMOVED***/
  email: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all StaffListModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<StaffListModel>) {
    this.email = data.email;
  }
}
