import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';

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
    private formBuiler: FormBuilder,
    private database: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.staffList$ = this.getAllStaff();
    this.addStaffForm = this.formBuiler.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), 
        Validators.required
       ])
      ],
      password: ['', Validators.required]
    });
    this.changeEmailForm = this.formBuiler.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), 
        Validators.required
       ])
      ]
    });
    this.changePasswordForm = this.formBuiler.group({
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

  }

  changeEmail(formValues: Partial<CredentialsModel>): void {

  }

  changePassword(formValues: Partial<CredentialsModel>): void {
    
  }

  resetPassword(staffEmail: string): void {
    this.afAuth.auth.sendPasswordResetEmail(staffEmail);
  }

}
