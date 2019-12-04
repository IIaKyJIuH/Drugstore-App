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
 ***REMOVED*****REMOVED*** For getting the local storage state of authorized user email.
 ***REMOVED*****REMOVED***/
  public readonly USER_EMAIL = 'userEmail';

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For getting the locacl storage state of authorized user role.
 ***REMOVED*****REMOVED***/
  public readonly USER_ROLE;

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
      tap(userData => {
        this.setUserData(userData);
      }),
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Registrates user in firebase.
 ***REMOVED*****REMOVED*** @param user - email + password.
 ***REMOVED*****REMOVED***/
  public signUp(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => {
        this.setUserData(userData);
      })
      );
  }

  private setUserData(userData: UserCredential): void {
    const UID = userData.user.uid;
    localStorage.setItem(this.USER_EMAIL, userData.user.email);
    if (UID === 'boVXL3ic7bgn2mRWk1mSu5QpUFN2') {
      localStorage.setItem(this.USER_ROLE, 'ADMIN');
    } else if (UID === 'AIcnJji6nRP1sS7iOrErZe8LbPe2') {
      localStorage.setItem(this.USER_ROLE, 'STAFF');
    } else {
      localStorage.setItem(this.USER_ROLE, 'USER');
    }
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Log outs user from firebase.
 ***REMOVED*****REMOVED***/
  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut()).pipe(
      tap(() => {
        this.deleteUserData();
      }),
    );
  }

  private deleteUserData(): void {
    localStorage.removeItem(this.USER_EMAIL);
    localStorage.removeItem(this.USER_ROLE);
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Checks if the user is logged in.
 ***REMOVED*****REMOVED*** @returns if the currentUser !== null - true, else - false.
 ***REMOVED*****REMOVED***/
  public isAuthenticated(): Observable<boolean> {
    return of(localStorage.getItem(this.USER_EMAIL) !== null);
  }

}