import { PeopleStatisticsModel } from './people-statistics-model';

export class UserStatisticsModel extends PeopleStatisticsModel {

  /**
   * How many times user cancelled bookings.
   */
  cancellationsAmount: number;

  /**
   * How many times user failed to pay transaction of the prepared booking
   */
  failuresAmount: number;

  /**
   * Unique key for getting record about this booking.
   */
  key: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all UserStatisticsModel fields.
   */
  constructor(data: Partial<UserStatisticsModel>) {
    super(
      new PeopleStatisticsModel({
        email: data.email,
        purchasesAmount: data.purchasesAmount
      })
    );
    this.cancellationsAmount = data.cancellationsAmount;
    this.failuresAmount = data.failuresAmount;
    this.key = data.key;
  }
}
