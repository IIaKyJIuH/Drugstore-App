export class ArchiveModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Format - YYYY-MM-DD HH:MM
 ***REMOVED*****REMOVED***/
  date: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Staff who performed transaction.
 ***REMOVED*****REMOVED***/
  staffEmail: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** User who payed transaction.
 ***REMOVED*****REMOVED***/
  userEmail: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** 'warning', 'success' or 'cancelled'
 ***REMOVED*****REMOVED***/
  status: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many items were purchased.
 ***REMOVED*****REMOVED***/
  purchasesAmount: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all ArchiveModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<ArchiveModel>) {
    this.date = data.date;
    this.staffEmail = data.staffEmail;
    this.userEmail = data.userEmail;
    this.status = data.status;
    this.purchasesAmount = data.purchasesAmount;
  }
}
