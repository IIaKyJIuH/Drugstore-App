import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserCredential } from '@firebase/auth-types';
import { auth } from 'firebase';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/authentication/credentials-model';
import { UserModel } from '../models/authentication/user-model';

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
  public readonly USER_EMAIL = 'USER_EMAIL';

  /**
   * For getting the locacl storage state of authorized user role.
   */
  public readonly USER_ROLE = 'USER_ROLE';

  private authStatus$: Observable<boolean>;

  /**
   * .сtor
   * @param afAuth - angular fire authentication service.
   */
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
    const uids = {
      admin: [
        'jvJiZZZ8WnUizGfLyBr8AIQOU6Z2'
      ],
      staff: [
        '1UepQikTzlMzzXVvK6tX8jAEGHI3'
      ]
    };
    localStorage.setItem('uids', JSON.stringify(uids));
  }

  /**
   * Signs in user with inputed email and password.
   * @param user - interface that includes user email and password.
   * @returns firebase response user data flow.
   */
  public signIn(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password));
  }

  /**
   * Registrates user in firebase and signs him in.
   * @param user - email + password.
   * @return firebase response user data flow.
   */
  public signUp(user: CredentialsModel): Observable<UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap(userData => {
        return of(userData.user.sendEmailVerification()).pipe(
          map(() => userData)
        )
      })
    );
  }

  /**
   * For setting user data to local storage.
   * @param user - user data from firebase response.
   */
  private setUserData(user: User): void {
    const UID = user.uid;
    const permissions = ['watchStaffuser', 'editStaffuser', 'watchMedicines', 'bookMedicines', 'editMedicines', 'watchArchive', 'editArchive', 'doClientQueries', 'watchEmailuser', 'editEmailuser'];
    this.ngxPermissions.loadPermissions(permissions);
    localStorage.setItem(this.USER_EMAIL, user.email);
    const uids = JSON.parse(localStorage.getItem('uids'));
    if (uids.admin.includes(UID)) {
      localStorage.setItem(this.USER_ROLE, 'ADMIN');
      this.ngxRoles.addRole('ADMIN', permissions);
    } else if (uids.staff.includes(UID)) {
      localStorage.setItem(this.USER_ROLE, 'STAFF');
      this.ngxRoles.addRole('STAFF', ['watchArchive', 'doClientQueries']);
    } else {
      localStorage.setItem(this.USER_ROLE, 'USER');
      this.ngxRoles.addRole('USER', ['watchMedicines', 'bookMedicines']);
    }
  }

  addNewStaff(staff: CredentialsModel): void {
    from(this.afAuth.auth.createUserWithEmailAndPassword(staff.email, staff.password)).pipe(
      take(1),
      switchMap(userData => {
        const uids = JSON.parse(localStorage.getItem('uids'));
        if (!uids.staff.includes(userData.user.uid)) {
          uids.staff.push(userData.user.uid);
        }
        localStorage.setItem('uids', JSON.stringify(uids));
        return of(userData.user.sendEmailVerification()).pipe(
          map(() => userData)
        )
      })
    ).subscribe();
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
    localStorage.removeItem('cart');
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
   * just returns auth object flow with auth state
   * @returns if the currentUser !== null - isAuthenticated - true, else - false.
   */
  getAuthStatus(): Observable<boolean> {
    return this.authStatus$;
  }

}
