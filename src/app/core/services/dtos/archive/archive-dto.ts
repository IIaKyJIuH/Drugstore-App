***REMOVED****
***REMOVED*** For getting archive data from db.
***REMOVED***/
export interface ArchiveDto {

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
  purchases: number;

}
