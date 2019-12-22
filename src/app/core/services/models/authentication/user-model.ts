import { UserTokensModel } from './user-tokens-model';

/**
 * Holds user data when he is signed-in.
 */
export class UserModel extends UserTokensModel {

    /**
     * user email.
     */
    public email: string;

    /**
     * user role in app.
     */
    public role: string;

  /**
   * .ctor
   * @param data - object, not necessarily containing all UserModel fields.
   */
  constructor(data: Partial<UserModel>) {
        super(
          new UserTokensModel({
            idToken: data.idToken,
            secureToken: data.secureToken,
          }),
        );
        this.email = data.email;
        this.role = data.role;
    }
}
