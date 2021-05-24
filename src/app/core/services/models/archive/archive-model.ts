export class ArchiveModel {

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
  purchasesAmount: number;

  /**
   * Unique key for getting record about this booking.
   */
  key: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all ArchiveModel fields.
   */
  constructor(data: Partial<ArchiveModel>) {
    this.date = data.date;
    this.staffEmail = data.staffEmail;
    this.userEmail = data.userEmail;
    this.status = data.status;
    this.purchasesAmount = data.purchasesAmount;
    this.key = data.key;
  }
}
