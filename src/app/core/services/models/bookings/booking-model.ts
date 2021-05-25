import { MedicineModel } from "../medicines/medicine-model";

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
   * Unique key for getting record about this booking.
   */
  key: string;

  /**
   * Tells if the booking is ready to be sold.
   */
  isReady: boolean;

  /**
   * .ctor
   * @param data - object, not necessarily containing all BookingModel fields.
   */
  constructor(data: Partial<BookingModel>) {
    this.email = data.email;
    this.medicines = data.medicines;
    this.key = data.key;
    this.isReady = data.isReady;
  }
}
