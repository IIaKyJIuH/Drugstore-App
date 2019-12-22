export class StaffListModel {

  /**
   * Staff email.
   */
  email: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all StaffListModel fields.
   */
  constructor(data: Partial<StaffListModel>) {
    this.email = data.email;
  }
}
