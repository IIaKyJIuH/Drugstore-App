import { UserTokens } from './user-tokens';

/**
 * User model that tries to fits FireBase response.
 */
export class UserModel extends UserTokens {

    /**
     * user email.
     */
    public email: string;

    /**
     * user role in app.
     */
    public role: string;

    constructor(data: Partial<UserModel>) {
        super(
          new UserTokens({
            idToken: data.idToken,
            secureToken: data.secureToken,
          }),
        );
        this.email = data.email;
        this.role = data.role;
    }
}
