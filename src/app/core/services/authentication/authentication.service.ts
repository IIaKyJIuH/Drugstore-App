import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials-model';

/**
 * Service that authorizes user at FireBase.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  /**
   * For getting the local storage state of authorized user email.
   */
  public readonly USER_EMAIL = 'userEmail';

  /**
   * For getting the locacl storage state of authorized user role.
   */
  public readonly USER_ROLE;

  /**
   * .сtor
   * @param afAuth - angular fire authentication service.
   */
  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  /**
   * Signs in user with inputed email and password.
   * @param user - interface that includes user email and password.
   * @returns firebase response user data flow.
   */
  public signIn(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => {
        this.setUserData(userData);
      }),
    );
  }

  /**
   * Registrates user in firebase and signs him in.
   * @param user - email + password.
   * @return firebase response user data flow.
   */
  public signUp(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => {
        this.setUserData(userData);
      })
      );
  }

  /**
   * For setting user data to local storage.
   * @param userData - user data from firebase response.
   */
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

  /**
   * Log outs user from firebase.
   */
  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut()).pipe(
      tap(() => {
        this.deleteUserData();
      }),
    );
  }

  /**
   * For deleting local storage states.
   */
  private deleteUserData(): void {
    localStorage.removeItem(this.USER_EMAIL);
    localStorage.removeItem(this.USER_ROLE);
  }

  /**
   * Checks if the user is logged in.
   * @returns if the currentUser !== null - true, else - false.
   */
  public isAuthenticated(): Observable<boolean> {
    return of(localStorage.getItem(this.USER_EMAIL) !== null);
  }

}
