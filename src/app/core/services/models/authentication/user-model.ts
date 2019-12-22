import { UserTokensModel } from './user-tokens-model';

***REMOVED****
***REMOVED*** Holds user data when he is signed-in.
***REMOVED***/
export class UserModel extends UserTokensModel {

   ***REMOVED*****REMOVED****
    ***REMOVED*** user email.
    ***REMOVED***/
    public email: string;

   ***REMOVED*****REMOVED****
    ***REMOVED*** user role in app.
    ***REMOVED***/
    public role: string;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param data - object, not necessarily containing all UserModel fields.
  ***REMOVED***/
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
