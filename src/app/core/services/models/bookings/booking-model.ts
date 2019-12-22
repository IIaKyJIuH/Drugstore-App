import { MedicineModel } from '../medicines/medicine-model';

export class BookingModel {

  /**
   * User who booked medicines.
   */
  email: string;

  /**
   * Booked by user.
   */
  medicines: MedicineModel[];

  /**
   * .ctor
   * @param data - object, not necessarily containing all BookingModel fields.
   */
  constructor(data: Partial<BookingModel>) {
    this.email = data.email;
    this.medicines = data.medicines;
  }
}
