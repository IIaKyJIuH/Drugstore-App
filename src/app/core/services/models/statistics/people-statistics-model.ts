export class PeopleStatisticsModel {

  /**
   * Email corresponding to model owner.
   */
  email: string;

  /**
   * How many items were purchased to model owner.
   */
  purchasesAmount: number;

  /**
   * .ctor
   * @param data - object, not necessarily containing all PeopleStatisticsModel fields.
   */
  constructor(data: Partial<PeopleStatisticsModel>) {
    this.email = data.email;
    this.purchasesAmount = data.purchasesAmount;
  }
}
