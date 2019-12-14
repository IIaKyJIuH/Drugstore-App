***REMOVED****
***REMOVED*** Includes values isAuthenticated and verified.
***REMOVED***/
export class AuthenticationModel {

  ***REMOVED*****REMOVED*****REMOVED****
   ***REMOVED*****REMOVED*** Is user logged in.
   ***REMOVED*****REMOVED***/
    isAuthenticated: boolean;

  ***REMOVED*****REMOVED*****REMOVED****
   ***REMOVED*****REMOVED*** Is user verifed.
   ***REMOVED*****REMOVED***/
    isVerified: boolean;

    constructor(data: Partial<AuthenticationModel>) {
        this.isAuthenticated = data.isAuthenticated;
        this.isVerified = data.isVerified; 
    }

}
