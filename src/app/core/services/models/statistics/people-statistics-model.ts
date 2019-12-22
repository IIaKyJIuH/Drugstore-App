export class PeopleStatisticsModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Email corresponding to model owner.
  ***REMOVED***/
  email: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many items were purchased to model owner.
  ***REMOVED***/
  purchasesAmount: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all PeopleStatisticsModel fields.
  ***REMOVED***/
  constructor(data: Partial<PeopleStatisticsModel>) {
    this.email = data.email;
    this.purchasesAmount = data.purchasesAmount;
    this.key = data.key;
  }
}
