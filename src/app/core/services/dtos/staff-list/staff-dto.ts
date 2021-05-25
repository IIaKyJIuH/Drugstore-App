/**
 * Staff info from db.
 */
export interface StaffDto {
  /**
   * Staff email.
   */
  email: string;

  /**
   * Unique key for getting record from db.
   */
  key?: string;
}
