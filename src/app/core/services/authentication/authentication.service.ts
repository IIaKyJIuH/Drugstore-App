import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserCredential } from '@firebase/auth-types';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';
import { NgxRolesService } from 'ngx-permissions';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/authentication/credentials-model';
import { UserModel } from '../models/authentication/user-model';

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
  public readonly USER_EMAIL = 'USER_EMAIL';

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For getting the local storage state of authorized user role.
 ***REMOVED*****REMOVED***/
  public readonly USER_ROLE = 'USER_ROLE';

  private readonly authStatus$: Observable<boolean>;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .сtor
 ***REMOVED*****REMOVED*** @param ngZone - for getting over the non-angular async functions.
 ***REMOVED*****REMOVED*** @param afAuth - angular fire authentication service.
 ***REMOVED*****REMOVED*** @param ngxRoles - for dealing with user roles.
 ***REMOVED*****REMOVED*** @param database - for interacting with current project db.
 ***REMOVED*****REMOVED***/
  constructor(
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private ngxRoles: NgxRolesService,
    private database: AngularFireDatabase,
  ) {
    this.authStatus$ = new Observable(observer => {
      return this.afAuth.auth.onAuthStateChanged((user) => {
        this.ngZone.run(() => {
          if (user) {
            observer.next(true);
            this.setUserData(user);
          } else {
            observer.next(false);
            this.deleteUserData();
          }
        });
      });
    });
    const uids = {
      admin: [
        'jvJiZZZ8WnUizGfLyBr8AIQOU6Z2'
      ],
      staff: [
        '1UepQikTzlMzzXVvK6tX8jAEGHI3'
      ]
  ***REMOVED*****REMOVED*****REMOVED***
    localStorage.setItem('uids', JSON.stringify(uids));
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Signs in user with inputted email and password.
 ***REMOVED*****REMOVED*** @param user - interface that includes user email and password.
 ***REMOVED*****REMOVED*** @returns firebase response user data flow.
 ***REMOVED*****REMOVED***/
  public signIn(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password));
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Register user in firebase and signs him in.
 ***REMOVED*****REMOVED*** @param user - email + password.
 ***REMOVED*****REMOVED*** @return firebase response user data flow.
 ***REMOVED*****REMOVED***/
  public signUp(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password));
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For setting user data to local storage.
 ***REMOVED*****REMOVED*** @param user - user data from firebase response.
 ***REMOVED*****REMOVED***/
  private setUserData(user: User): void {
    const UID = user.uid;
    localStorage.setItem(this.USER_EMAIL, user.email);
    const uids = JSON.parse(localStorage.getItem('uids'));
    if (uids.admin.includes(UID)) {
      localStorage.setItem(this.USER_ROLE, 'ADMIN');
      this.ngxRoles.addRole('ADMIN', () => {
        return true;
      });
    } else if (uids.staff.includes(UID)) {
      localStorage.setItem(this.USER_ROLE, 'STAFF');
      this.ngxRoles.addRole('STAFF', () => {
        return true;
      });
    } else {
      localStorage.setItem(this.USER_ROLE, 'USER');
      this.ngxRoles.addRole('USER', () => {
        return true;
      });
    }
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Creates new staff in current firebase project.
 ***REMOVED*****REMOVED*** @param staff - new staff email + password.
 ***REMOVED*****REMOVED***/
  addNewStaff(staff: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(staff.email, staff.password)).pipe(
      take(1),
      tap((userData: UserCredential) => {
        const uids = JSON.parse(localStorage.getItem('uids'));
        if (!uids.staff.includes(userData.user.uid)) {
          uids.staff.push(userData.user.uid);
        }
        localStorage.setItem('uids', JSON.stringify(uids));
        this.database.list('/staff/emails/').push({ email: userData.user.email });
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Logs out user from firebase.
 ***REMOVED*****REMOVED***/
  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut()).pipe(
      tap(() => {
        this.deleteUserData();
        this.ngxRoles.flushRoles();
      }),
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** If user wants to.
 ***REMOVED*****REMOVED***/
  changeUserEmail(newEmail: string): Observable<void> {
    return from(this.afAuth.auth.currentUser.updateEmail(newEmail)).pipe(
      tap(() => {
        localStorage.setItem(this.USER_EMAIL, newEmail);
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** After password confirmation, if user wants to.
 ***REMOVED*****REMOVED***/
  changeUserPassword(newPassword: string): Observable<void> {
    return from(this.afAuth.auth.currentUser.updatePassword(newPassword));
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Tries to reauthenticate user with given password => checks password confirmation in user settings page, when he wants to change his password.
 ***REMOVED*****REMOVED*** @param password
 ***REMOVED*****REMOVED***/
  isCurrentPassword(password: string): Observable<UserCredential> {
    const user: User | null = this.afAuth.auth.currentUser; // Probably not null, because only authenticated user can access settings.
    const credential = auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    return from(user.reauthenticateWithCredential(credential));
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For deleting local storage states.
 ***REMOVED*****REMOVED***/
  private deleteUserData(): void {
    localStorage.removeItem(this.USER_EMAIL);
    localStorage.removeItem(this.USER_ROLE);
    localStorage.removeItem('cart');
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For getting user email and role.
 ***REMOVED*****REMOVED***/
  getUserData(): UserModel {
    return new UserModel({
      email: localStorage.getItem(this.USER_EMAIL),
      role: localStorage.getItem(this.USER_ROLE)
    });
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** just returns auth object flow with auth state
 ***REMOVED*****REMOVED*** @returns if the currentUser !== null - isAuthenticated - true, else - false.
 ***REMOVED*****REMOVED***/
  getAuthStatus(): Observable<boolean> {
    return this.authStatus$;
  }

}
