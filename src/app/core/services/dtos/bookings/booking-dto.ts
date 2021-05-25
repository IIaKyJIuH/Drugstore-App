import { MedicineDto } from "../medicines/medicine-dto";

/**
 * For getting data about bookings from db.
 */
export interface BookingDto {
  /**
   * User who booked medicines.
   */
  email: string;

  /**
   * Booked by user.
   */
  items: MedicineDto[];

  /**
   * Unique key for getting record from db.
   */
  key?: string;
}
