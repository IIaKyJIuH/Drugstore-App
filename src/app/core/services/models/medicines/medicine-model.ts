export class MedicineModel {

  /**
   * Medicine official name
   */
  name: string;

  /**
   * How many times are this medicine in the db.
   */
  amount: number;

  /**
   * .ctor
   * @param data - object, not necessarily containing all MedicineModel fields.
   */
  constructor(data: Partial<MedicineModel>) {
    this.name = data.name;
    this.amount = data.amount;
  }
}
