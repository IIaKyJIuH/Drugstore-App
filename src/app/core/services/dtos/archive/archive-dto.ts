/**
 * For getting archive data from db.
 */
export interface ArchiveDto {

  /**
   * Format - YYYY-MM-DD HH:MM
   */
  date: string;

  /**
   * Staff who performed transaction.
   */
  staffEmail: string;

  /**
   * User who payed transaction.
   */
  userEmail: string;

  /**
   * 'warning', 'success' or 'cancelled'
   */
  status: string;

  /**
   * How many items were purchased.
   */
  purchases: number;

}
