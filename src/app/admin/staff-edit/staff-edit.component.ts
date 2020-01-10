import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from '@firebase/auth-types';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/authentication/credentials-model';
import { ProjectFunctions } from '../../core/services/data/project-functions';
import { StaffDto } from '../../core/services/dtos/staff-list/staff-dto';
import { StaffModel } from '../../core/services/models/staff-list/staff-model';
import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** List with all staff registered in db.
  ***REMOVED***/
  staffList$: Observable<any>;

  addStaffForm: FormGroup; // For adding new staff.
  changeEmailForm: FormGroup; // For changing staff email.
  changePasswordForm: FormGroup; // For changing staff password.

 ***REMOVED*****REMOVED****
  ***REMOVED*** For easier actualization of db changes.
  ***REMOVED*** @param dtoArr - to be converted to corresponding model.
  ***REMOVED***/
  private static mapDtoArrayToModelArray(dtoArr: StaffDto[]): StaffModel[] {
    const result = [];
    for (const dto of dtoArr) {
      result.push(new StaffModel({
        email: dto.email,
        key: dto.key
      }));
    }
    return result;
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param afAuth - for interacting with firebase auth api.
  ***REMOVED*** @param formBuilder - for easier buildings of forms.
  ***REMOVED*** @param database - for interacting with firebase db.
  ***REMOVED*** @param authService - for getting current auth data.
  ***REMOVED*** @param notifications - for getting result of operations.
  ***REMOVED***/
  constructor(
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Gets all staff profiles.
  ***REMOVED***/
  getAllStaff(): Observable<StaffModel[]> {
    return this.database.list('/staff/emails/').valueChanges()
      .pipe(
        map((recordings: object) => {
          const staffDtoArr: StaffDto[] = ProjectFunctions.mapObjectToArray(recordings);
          return StaffEditComponent.mapDtoArrayToModelArray(staffDtoArr);
        })
      )
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Registers new staff in firebase project.
  ***REMOVED*** @param formValues - credentials of the new staff.
  ***REMOVED***/
  addStaff(formValues: CredentialsModel): void {
    this.authService.addNewStaff(formValues)
      .subscribe(
        (newStaffData: UserCredential) => {
          newStaffData.user.sendEmailVerification();
     ***REMOVED*****REMOVED*** (error) => {
          this.notifications.showWarning('oops', error);
        }
      );
  }

  // TODO: need to add server for this and the next.
  changeEmail(formValues: Partial<CredentialsModel>): void {

  }

  changePassword(formValues: Partial<CredentialsModel>): void {

  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** For resetting password of the staff.
  ***REMOVED*** @param staffEmail - where to send reset link.
  ***REMOVED***/
  resetPassword(staffEmail: string): void {
    this.afAuth.auth.sendPasswordResetEmail(staffEmail);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Deletes staff from firebase project.
  ***REMOVED*** @param staffEmail - to be deleted.
  ***REMOVED***/
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
        })// TODO: add logic to delete user from firebase project.
      ).subscribe();
  }

}
