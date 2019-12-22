export class MedicineStatisticsModel {

  /**
   * Medicine official name;
   */
  name: string;

  /**
   * How many times was purchased this medicine.
   */
  purchasesAmount: number;

  /**
   * .ctor
   * @param data - object, not necessarily containing all MedicineStatisticsModel fields
   */
  constructor(data: Partial<MedicineStatisticsModel>) {
    this.name = data.name;
    this.purchasesAmount = data.purchasesAmount;
  }

}
