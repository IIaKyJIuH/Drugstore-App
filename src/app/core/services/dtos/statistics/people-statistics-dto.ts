export interface PeopleStatisticsDto {
  /**
   * Email corresponding to model owner.
   */
  email: string;

  /**
   * How many items were purchased to model owner.
   */
  purchasedItems: number;

  /**
   * Unique key for getting record from db.
   */
  key?: string;
}
