***REMOVED****
***REMOVED*** User token model for maintaining access and secure tokens.
***REMOVED***/
export class UserTokensModel {

 ***REMOVED*****REMOVED****
  ***REMOVED*** user token from firebase response on sign-in/sign-up.
  ***REMOVED***/
  public idToken: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** user secure token for refreshing idToken.
  ***REMOVED***/
  public secureToken: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all UserTokensModel fields.
  ***REMOVED***/
  constructor(data: Partial<UserTokensModel>) {
      this.idToken = data.idToken;
      this.secureToken = data.secureToken;
  }
}
