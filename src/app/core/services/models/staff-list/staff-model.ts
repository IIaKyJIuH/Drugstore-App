export class StaffModel {
  /**
   * Staff email.
   */
  email: string;

  /**
   * Unique key for getting record about this booking.
   */
  key: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all StaffModel fields.
   */
  constructor(data: Partial<StaffModel>) {
    this.email = data.email;
    this.key = data.key;
  }
}
