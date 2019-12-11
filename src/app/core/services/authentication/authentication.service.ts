import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';
import { auth } from 'firebase';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials-model';
import { UserModel } from '../models/user-model';

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
  public readonly USER_ROLE = 'userRole';

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .сtor
 ***REMOVED*****REMOVED*** @param afAuth - angular fire authentication service.
 ***REMOVED*****REMOVED***/
  constructor(
    private afAuth: AngularFireAuth,
    private ngxPermissions: NgxPermissionsService,
    private ngxRoles: NgxRolesService,
  ) { }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Signs in user with inputed email and password.
 ***REMOVED*****REMOVED*** @param user - interface that includes user email and password.
 ***REMOVED*****REMOVED*** @returns firebase response user data flow.
 ***REMOVED*****REMOVED***/
  public signIn(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      tap(userData => {
        this.setUserData(userData);
      }),
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
        this.setUserData(userData);
      })
    );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** For setting user data to local storage.
 ***REMOVED*****REMOVED*** @param userData - user data from firebase response.
 ***REMOVED*****REMOVED***/
  private setUserData(userData: UserCredential): void {
    const UID = userData.user.uid;
    const permissions = ['watchStaffuser', 'editStaffuser', 'watchMedicines', 'bookMedicines', 'editMedicines', 'watchArchive', 'editArchive', 'doClientQueries', 'watchEmailuser', 'editEmailuser'];
    this.ngxPermissions.loadPermissions(permissions);
    localStorage.setItem(this.USER_EMAIL, userData.user.email);
    if (UID === 'boVXL3ic7bgn2mRWk1mSu5QpUFN2') {
      localStorage.setItem(this.USER_ROLE, 'ADMIN');
      this.ngxRoles.addRole('ADMIN', permissions);
    } else if (UID === 'AIcnJji6nRP1sS7iOrErZe8LbPe2') {
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
 ***REMOVED*****REMOVED*** Checks if the user is logged in.
 ***REMOVED*****REMOVED*** @returns if the currentUser !== null - true, else - false.
 ***REMOVED*****REMOVED***/
  public isAuthenticated(): Observable<boolean> {
    return of(localStorage.getItem(this.USER_EMAIL) !== null);
  }

}
