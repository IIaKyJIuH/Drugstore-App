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
   * Unique key for getting record about this booking.
   */
  key: string;

  /**
   * Pharmacy, from where the medicine.
   */
  pharmacy?: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all MedicineModel fields.
   */
  constructor(data: Partial<MedicineModel>) {
    this.name = data.name;
    this.amount = data.amount;
    this.key = data.key;
    this.pharmacy = data.pharmacy;
  }
}
