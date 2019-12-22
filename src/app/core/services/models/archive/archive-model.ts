export class ArchiveModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Format - YYYY-MM-DD HH:MM
  ***REMOVED***/
  date: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Staff who performed transaction.
  ***REMOVED***/
  staffEmail: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** User who payed transaction.
  ***REMOVED***/
  userEmail: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** 'warning', 'success' or 'cancelled'
  ***REMOVED***/
  status: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many items were purchased.
  ***REMOVED***/
  purchasesAmount: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all ArchiveModel fields.
  ***REMOVED***/
  constructor(data: Partial<ArchiveModel>) {
    this.date = data.date;
    this.staffEmail = data.staffEmail;
    this.userEmail = data.userEmail;
    this.status = data.status;
    this.purchasesAmount = data.purchasesAmount;
    this.key = data.key;
  }
}
