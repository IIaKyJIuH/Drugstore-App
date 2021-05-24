export interface MedicineStatisticsDto {

  /**
   * Medicine official name;
   */
  term: string;

  /**
   * How many times was purchased this medicine.
   */
  purchased: number;

  /**
   * Unique key for getting record from db.
   */
  key?: string;

}
