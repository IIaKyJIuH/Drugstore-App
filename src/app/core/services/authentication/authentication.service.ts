import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials-model';
import { UserModel } from '../models/user-model';
import UserCredential = firebase.auth.UserCredential;

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
 ***REMOVED*****REMOVED*** For getting the locacl storage state of authorized user role.
 ***REMOVED*****REMOVED***/
  public readonly USER_ROLE = 'USER_ROLE';

  private authStatus$: Observable<boolean>;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .сtor
 ***REMOVED*****REMOVED*** @param afAuth - angular fire authentication service.
 ***REMOVED*****REMOVED***/
  constructor(
    private afAuth: AngularFireAuth,
    private ngxPermissions: NgxPermissionsService,
    private ngxRoles: NgxRolesService,
    private ngZone: NgZone
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
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Signs in user with inputed email and password.
 ***REMOVED*****REMOVED*** @param user - interface that includes user email and password.
 ***REMOVED*****REMOVED*** @returns firebase response user data flow.
 ***REMOVED*****REMOVED***/
  public signIn(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => {
        this.setUserData(userData.user);
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Registrates user in firebase and signs him in.
 ***REMOVED*****REMOVED*** @param user - email + password.
 ***REMOVED*****REMOVED*** @return firebase response user data flow.
 ***REMOVED*****REMOVED***/
  public signUp(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => {
        this.setUserData(userData.user);
      }),
      switchMap(userData => {
        return of(userData.user.sendEmailVerification()).pipe(
          map(() => userData)
        )
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For setting user data to local storage.
 ***REMOVED*****REMOVED*** @param user - user data from firebase response.
 ***REMOVED*****REMOVED***/
  private setUserData(user: User): void {
    const UID = user.uid;
    const permissions = ['watchStaffuser', 'editStaffuser', 'watchMedicines', 'bookMedicines', 'editMedicines', 'watchArchive', 'editArchive', 'doClientQueries', 'watchEmailuser', 'editEmailuser'];
    this.ngxPermissions.loadPermissions(permissions);
    localStorage.setItem(this.USER_EMAIL, user.email);
    if (UID === 'jvJiZZZ8WnUizGfLyBr8AIQOU6Z2') {
      localStorage.setItem(this.USER_ROLE, 'ADMIN');
      this.ngxRoles.addRole('ADMIN', permissions);
    } else if (UID === '1UepQikTzlMzzXVvK6tX8jAEGHI3') {
      localStorage.setItem(this.USER_ROLE, 'STAFF');
      this.ngxRoles.addRole('STAFF', ['watchArchive', 'doClientQueries']);
    } else {
      localStorage.setItem(this.USER_ROLE, 'USER');
      this.ngxRoles.addRole('USER', ['watchMedicines', 'bookMedicines']);
    }
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Log outs user from firebase.
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
 ***REMOVED*****REMOVED*** For changing user if he wants to.
 ***REMOVED*****REMOVED***/
  changeUserEmail(newEmail: string): Observable<void> {
    return from(this.afAuth.auth.currentUser.updateEmail(newEmail)).pipe(
      tap(() => {
        localStorage.setItem(this.USER_EMAIL, newEmail);
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For changing user password after password confirmation, if he wants to.
 ***REMOVED*****REMOVED***/
  changeUserPassword(newPassword: string): Observable<void> {
    return from(this.afAuth.auth.currentUser.updatePassword(newPassword));
  }

  isCurrentPassword(password: string): Observable<UserCredential> {
    const user = this.afAuth.auth.currentUser;
    const credential = auth.EmailAuthProvider.credential(
      this.getUserData().email,
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
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For getting user email and role.
 ***REMOVED*****REMOVED***/
  getUserData(): UserModel {
    const user = new UserModel({
      email: localStorage.getItem(this.USER_EMAIL),
      role: localStorage.getItem(this.USER_ROLE)
    });
    return user;
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** just returns auth object flow with auth state
 ***REMOVED*****REMOVED*** @returns if the currentUser !== null - isAuthenticated - true, else - false.
 ***REMOVED*****REMOVED***/
  getAuthStatus(): Observable<boolean> {
    return this.authStatus$;
  }

}
