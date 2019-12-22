***REMOVED****
***REMOVED*** For getting medicines data from db.
***REMOVED***/
export interface MedicineDto {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Medicine official name
  ***REMOVED***/
  term: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times are this medicine in the db.
  ***REMOVED***/
  count: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record from db.
  ***REMOVED***/
  key?: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Pharmacy, from where the medicine.
  ***REMOVED***/
  pharmacy?: string;

}
