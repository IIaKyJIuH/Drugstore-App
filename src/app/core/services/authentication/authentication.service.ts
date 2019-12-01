import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials-model';

***REMOVED****
***REMOVED*** Service that authorizes user at FireBase.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For getting the local storage state of authorized user.
 ***REMOVED*****REMOVED***/
  public readonly USER_UID = 'userUID';

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .сtor
 ***REMOVED*****REMOVED*** @param afAuth - angular fire authentication service.
 ***REMOVED*****REMOVED***/
  constructor(
    private afAuth: AngularFireAuth,
  ) { }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Signs in user with inputed email and password.
 ***REMOVED*****REMOVED*** @param user - interface that includes user email and password.
 ***REMOVED*****REMOVED*** @returns observable user object.
 ***REMOVED*****REMOVED***/
  public signIn(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => localStorage.setItem(this.USER_UID, userData.user.uid)),
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Log outs user from firebase.
 ***REMOVED*****REMOVED***/
  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut()).pipe(
      tap(() => localStorage.removeItem(this.USER_UID)),
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Checks if the user is logged in.
 ***REMOVED*****REMOVED*** @returns if the currentUser !== null - true, else - false.
 ***REMOVED*****REMOVED***/
  public isAuthenticated(): Observable<boolean> {
    return of(localStorage.getItem(this.USER_UID) !== null);
  }

}
