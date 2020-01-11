import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/authentication/credentials-model';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { PasswordValidator } from 'src/app/core/services/registration/password-validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Form for email changing
  ***REMOVED***/
  emailChangeForm: FormGroup;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Form for changing user password.
  ***REMOVED***/
  passwordChangeForm: FormGroup;

 ***REMOVED*****REMOVED****
  ***REMOVED*** State for checking if the password inputted by user(for changing password) is right.
  ***REMOVED***/
  isCurrentPasswordRight: boolean;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param formBuilder - for easier form creation.
  ***REMOVED*** @param authService - for everything about authentication from firebase project.
  ***REMOVED*** @param notifications - for getting operations status.
  ***REMOVED***/
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notifications: NotificationService
  ) {
    this.emailChangeForm = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$') ]
    });
    this.passwordChangeForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ])],
      confirmPassword: ['', Validators.required],
 ***REMOVED*****REMOVED***
    { validator: PasswordValidator.areEqual });
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Changes user email.
  ***REMOVED*** @param emailFormValues - new email.
  ***REMOVED***/
  onEmailChangeSubmit(emailFormValues: Partial<CredentialsModel>): void {
    const newEmail = emailFormValues.email;
    if (newEmail === this.currentUserEmail) {
      this.notifications.showError('Actually, there is nothing to change', 'Logic error');
      return;
    }
    this.authService.changeUserEmail(emailFormValues.email).pipe(take(1)).subscribe(
      () => {
        this.notifications.showSuccess('Your email was successfully changed', 'Success');
   ***REMOVED*****REMOVED***
      (err: Error) => {
        this.notifications.showError('Something went wrong', err.message);
      }
    );
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Changes user password.
  ***REMOVED*** @param passwordFormValues - new password.
  ***REMOVED***/
  onPasswordChangeSubmit(passwordFormValues: Partial<CredentialsModel>): void {
    const newPassword = passwordFormValues.password;
    this.authService.changeUserPassword(newPassword).pipe(take(1)).subscribe(
      () => {
        this.notifications.showSuccess('Your password was successfully changed', 'Success');
   ***REMOVED*****REMOVED***
      (err: Error) => {
        this.notifications.showError('Something went wrong', err.message);
   ***REMOVED*****REMOVED***
      () => {
        this.passwordChangeForm.reset();
      }
    )
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** For getting signed-in user email.
  ***REMOVED***/
  get currentUserEmail(): string {
    return this.authService.getUserData().email;
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** For checking if the password inputted by user(for changing password) is right.
  ***REMOVED*** @param password - to be checked.
  ***REMOVED***/
  checkIfItIsCurrentPassword(password: string): void {
    this.authService.isCurrentPassword(password).pipe(
      take(1)
    ).subscribe(
      () => {
        this.isCurrentPasswordRight = true;
   ***REMOVED*****REMOVED***
      (err) => {
        this.notifications.showError('Ooops', 'Wrong password');
        this.isCurrentPasswordRight = false;
      });
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** For password confirmation.
  ***REMOVED***/
  onPasswordInput(): void {
    if (this.passwordChangeForm.hasError('nomatch')) {
      this.passwordControls.confirmPassword.setErrors([{'nomatch': true}]);
    }
    else {
      this.passwordControls.confirmPassword.setErrors(null);
    }
}

 ***REMOVED*****REMOVED****
  ***REMOVED*** All password controls.
  ***REMOVED*** @returns FormGroup.controls.
  ***REMOVED***/
  get passwordControls(): { [key: string]: AbstractControl; } { return this.passwordChangeForm.controls; }

}
