/**
 * For getting medicines data from db.
 */
export interface MedicineDto {

  /**
   * Medicine official name
   */
  term: string;

  /**
   * How many times are this medicine in the db.
   */
  count: number;

  /**
   * Unique key for getting record from db.
   */
  key?: string;

  /**
   * Pharmacy, from where the medicine.
   */
  pharmacy?: string;

}
