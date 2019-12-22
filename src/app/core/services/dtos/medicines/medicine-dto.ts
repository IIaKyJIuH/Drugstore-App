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

}
