import { PeopleStatisticsModel } from './people-statistics-model';

export class UserStatisticsModel extends PeopleStatisticsModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many times user cancelled bookings.
 ***REMOVED*****REMOVED***/
  cancellationsAmount: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many times user failed to pay transaction of the prepared booking
 ***REMOVED*****REMOVED***/
  failuresAmount: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all UserStatisticsModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<UserStatisticsModel>) {
    super(
      new PeopleStatisticsModel({
        email: data.email,
        purchasesAmount: data.purchasesAmount
      })
    );
    this.cancellationsAmount = data.cancellationsAmount;
    this.failuresAmount = data.failuresAmount;
  }
}
