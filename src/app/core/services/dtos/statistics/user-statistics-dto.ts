import { PeopleStatisticsDto } from './people-statistics-dto';

export interface UserStatisticsDto extends PeopleStatisticsDto {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many times user cancelled bookings.
 ***REMOVED*****REMOVED***/
  cancelledBookings: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many times user failed to pay transaction of the prepared booking
 ***REMOVED*****REMOVED***/
  failures: number;

}
