/**
 * User token model for maintaining access and secure tokens.
 */
export class UserTokensModel {
  /**
   * user token from firebase response on sign-in/sign-up.
   */
  public idToken: string;

  /**
   * user secure token for refreshing idToken.
   */
  public secureToken: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all UserTokensModel fields.
   */
  constructor(data: Partial<UserTokensModel>) {
    this.idToken = data.idToken;
    this.secureToken = data.secureToken;
  }
}
