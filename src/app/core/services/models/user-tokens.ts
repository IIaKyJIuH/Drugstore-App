***REMOVED****
***REMOVED*** User token model for keeping access and secure tokens.
***REMOVED***/
export class UserTokens {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** user token from server response.
 ***REMOVED*****REMOVED***/
  public idToken: string;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** user secure token for refreshing idToken.
 ***REMOVED*****REMOVED***/
  public secureToken: string;

  constructor(data: Partial<UserTokens>) {
      this.idToken = data.idToken;
      this.secureToken = data.secureToken;
  }
}
