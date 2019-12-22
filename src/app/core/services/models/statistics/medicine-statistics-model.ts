export class MedicineStatisticsModel {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Medicine official name;
 ***REMOVED*****REMOVED***/
  name: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** How many times was purchased this medicine.
 ***REMOVED*****REMOVED***/
  purchasesAmount: number;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param data - object, not necessarily containing all MedicineStatisticsModel fields
 ***REMOVED*****REMOVED***/
  constructor(data: Partial<MedicineStatisticsModel>) {
    this.name = data.name;
    this.purchasesAmount = data.purchasesAmount;
  }

}
