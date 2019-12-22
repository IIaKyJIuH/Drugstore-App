export class MedicineStatisticsModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Medicine official name;
  ***REMOVED***/
  name: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** How many times was purchased this medicine.
  ***REMOVED***/
  purchasesAmount: number;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Unique key for getting record about this booking.
  ***REMOVED***/
  key: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all MedicineStatisticsModel fields
  ***REMOVED***/
  constructor(data: Partial<MedicineStatisticsModel>) {
    this.name = data.name;
    this.purchasesAmount = data.purchasesAmount;
    this.key = data.key;
  }

}
