/**
 * Includes important authentication states.
 */
export class AuthenticationModel {

    /**
     * Is user logged in.
     */
    isAuthenticated: boolean;

    /**
     * Is user verified.
     */
    isVerified: boolean;

  /**
   * .ctor
   * @param data - object, not necessarily containing all AuthenticationModel fields.
   */
  constructor(data: Partial<AuthenticationModel>) {
        this.isAuthenticated = data.isAuthenticated;
        this.isVerified = data.isVerified;
    }

}
