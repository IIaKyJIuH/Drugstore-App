***REMOVED****
***REMOVED*** For getting archive data from db.
***REMOVED***/
export interface ArchiveDto {

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
  purchases: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record from db.
  ***REMOVED***/
  key?: string;

}
