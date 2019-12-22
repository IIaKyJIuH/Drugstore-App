import { PeopleStatisticsModel } from './people-statistics-model';

export class UserStatisticsModel extends PeopleStatisticsModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times user cancelled bookings.
  ***REMOVED***/
  cancellationsAmount: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times user failed to pay transaction of the prepared booking
  ***REMOVED***/
  failuresAmount: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all UserStatisticsModel fields.
  ***REMOVED***/
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
