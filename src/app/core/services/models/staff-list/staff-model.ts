export class StaffModel {

  /**
   * Staff email.
   */
  email: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all StaffModel fields.
   */
  constructor(data: Partial<StaffModel>) {
    this.email = data.email;
  }
}
