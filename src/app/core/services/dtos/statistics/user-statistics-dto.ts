import { PeopleStatisticsDto } from './people-statistics-dto';

export interface UserStatisticsDto extends PeopleStatisticsDto {

  /**
   * How many times user cancelled bookings.
   */
  cancelledBookings: number;

  /**
   * How many times user failed to pay transaction of the prepared booking
   */
  failures: number;

  /**
   * Unique key for getting record from db.
   */
  key?: string;

}
