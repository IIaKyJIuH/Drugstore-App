/**
 * Includes values isAuthenticated and verified.
 */
export class AuthenticationModel {

    /**
     * Is user logged in.
     */
    isAuthenticated: boolean;

    /**
     * Is user verifed.
     */
    isVerified: boolean;

    constructor(data: Partial<AuthenticationModel>) {
        this.isAuthenticated = data.isAuthenticated;
        this.isVerified = data.isVerified; 
    }

}
