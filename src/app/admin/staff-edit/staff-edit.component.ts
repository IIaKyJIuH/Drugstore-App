import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from '@firebase/auth-types';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/authentication/credentials-model';
import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent {

  staffList$: Observable<any>;

  addStaffForm: FormGroup;
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;

  doEmailChange = false;
  doPasswordChange = false;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private authService: AuthenticationService,
    private notifications: NotificationService,
  ) {
    this.staffList$ = this.getAllStaff();
    this.addStaffForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$'),
        Validators.required
       ])
      ],
      password: ['', Validators.required]
    });
    this.changeEmailForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$'),
        Validators.required
       ])
      ]
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
   }

  getAllStaff(): Observable<any> {
    return this.database.list('/staff/emails/').valueChanges()
      .pipe(
        map(recordings => {
          const recordsArr = [];
          for (const recordKey of Object.keys(recordings)) {
            recordsArr.push(recordings[recordKey]);
          }
          return recordsArr
        })
      )
  }

  addStaff(formValues: CredentialsModel): void {
    this.authService.addNewStaff(formValues)
      .subscribe(
        (newStaffData: UserCredential) => {
          newStaffData.user.sendEmailVerification();
    ***REMOVED*****REMOVED*****REMOVED*** (error) => {
          this.notifications.showWarning('oops', error);
        }
      );
  }

  changeEmail(formValues: Partial<CredentialsModel>): void {

  }

  changePassword(formValues: Partial<CredentialsModel>): void {

  }

  resetPassword(staffEmail: string): void {
    this.afAuth.auth.sendPasswordResetEmail(staffEmail);
  }

  deleteStaff(staffEmail: string): void {
    this.database.object('/staff/emails/').valueChanges()
      .pipe(
        take(1),
        tap(recordings => {
          for (const key of Object.keys(recordings)) {
            if (recordings[key].email === staffEmail) {
              this.database.list(`/staff/emails/${key}`).remove();
            }
          }
        })
      ).subscribe();
  }

}
