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
   * Unique key for getting record about this booking.
   */
  key: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all MedicineStatisticsModel fields
   */
  constructor(data: Partial<MedicineStatisticsModel>) {
    this.name = data.name;
    this.purchasesAmount = data.purchasesAmount;
    this.key = data.key;
  }
}
