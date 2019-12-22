import { MedicineDto } from '../medicines/medicine-dto';

***REMOVED****
***REMOVED*** For getting data about bookings from db.
***REMOVED***/
export interface BookingDto {

 ***REMOVED*****REMOVED****
  ***REMOVED*** User who booked medicines.
  ***REMOVED***/
  email: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Booked by user.
  ***REMOVED***/
  items: MedicineDto[];

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record from db.
  ***REMOVED***/
  key?: string;

}
