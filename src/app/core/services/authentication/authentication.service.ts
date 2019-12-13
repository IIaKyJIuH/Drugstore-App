import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';
import { auth } from 'firebase';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials-model';
import { UserModel } from '../models/user-model';

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
  public readonly USER_ROLE = 'userRole';

  public authStatus = new BehaviorSubject<boolean>(false);

  /**
   * .сtor
   * @param afAuth - angular fire authentication service.
   */
  constructor(
    private afAuth: AngularFireAuth,
    private ngxPermissions: NgxPermissionsService,
    private ngxRoles: NgxRolesService,
  ) { 
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authStatus.next(true);
      } else {
        this.authStatus.next(false);
      }
    })
  }

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
        userData.user.sendEmailVerification();
      })
    );
  }

  /**
   * For setting user data to local storage.
   * @param userData - user data from firebase response.
   */
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

  /**
   * Log outs user from firebase.
   */
  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut()).pipe(
      tap(() => {
        this.deleteUserData();
        this.ngxRoles.flushRoles();
      }),
    );
  }

  /**
   * For changing user if he wants to.
   */
  changeUserEmail(newEmail: string): Observable<void> {
    return from(this.afAuth.auth.currentUser.updateEmail(newEmail)).pipe(
      tap(() => {
        localStorage.setItem(this.USER_EMAIL, newEmail);
      })
    );
  }

  /**
   * For changing user password after password confirmation, if he wants to.
   */
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

  /**
   * For deleting local storage states.
   */
  private deleteUserData(): void {
    localStorage.removeItem(this.USER_EMAIL);
    localStorage.removeItem(this.USER_ROLE);
  }

  /**
   * For getting user email and role.
   */
  getUserData(): UserModel {
    const user = new UserModel({
      email: localStorage.getItem(this.USER_EMAIL),
      role: localStorage.getItem(this.USER_ROLE)
    });
    return user;
  }

  /**
   * Checks if the user is logged in.
   * @returns if the currentUser !== null - true, else - false.
   */
  get isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

}
