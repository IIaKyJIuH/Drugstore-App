export class PeopleStatisticsModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Email corresponding to model owner.
 ***REMOVED*****REMOVED***/
  email: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many items were purchased to model owner.
 ***REMOVED*****REMOVED***/
  purchasesAmount: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all PeopleStatisticsModel fields.
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<PeopleStatisticsModel>) {
    this.email = data.email;
    this.purchasesAmount = data.purchasesAmount;
  }
}
