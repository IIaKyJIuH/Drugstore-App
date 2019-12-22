import { PeopleStatisticsDto } from './people-statistics-dto';

export interface UserStatisticsDto extends PeopleStatisticsDto {

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times user cancelled bookings.
  ***REMOVED***/
  cancelledBookings: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times user failed to pay transaction of the prepared booking
  ***REMOVED***/
  failures: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record from db.
  ***REMOVED***/
  key?: string;

}
