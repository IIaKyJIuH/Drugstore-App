***REMOVED****
***REMOVED*** Includes important authentication states.
***REMOVED***/
export class AuthenticationModel {

   ***REMOVED*****REMOVED****
    ***REMOVED*** Is user logged in.
    ***REMOVED***/
    isAuthenticated: boolean;

   ***REMOVED*****REMOVED****
    ***REMOVED*** Is user verified.
    ***REMOVED***/
    isVerified: boolean;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all AuthenticationModel fields.
  ***REMOVED***/
  constructor(data: Partial<AuthenticationModel>) {
        this.isAuthenticated = data.isAuthenticated;
        this.isVerified = data.isVerified;
    }

}
