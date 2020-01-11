import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from '@firebase/auth-types';
import { FirebaseError } from 'firebase';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/authentication/credentials-model';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { PasswordValidator } from 'src/app/core/services/registration/password-validator';

***REMOVED****
***REMOVED*** Signing-in page for user to get access for other app abilities.
***REMOVED***/
@Component({
  selector: 'app-user-form',
  templateUrl: 'data-form.component.html',
  styleUrls: ['data-form.component.css'],
})
export class DataFormComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Form data: email + password.
  ***REMOVED***/
  public formData: FormGroup;

 ***REMOVED*****REMOVED****
  ***REMOVED*** For checking if the user wants to sign-up instead of sign-in.
  ***REMOVED***/
  isSigningUp = false;

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param router - responsible for redirecting user.
  ***REMOVED*** @param formBuilder - for easier form creation.
  ***REMOVED*** @param authService - my authorization service.
  ***REMOVED*** @param notifications - for getting result of operations.
  ***REMOVED***/
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notifications: NotificationService,
  ) {
      this.formData  =  this.formBuilder.group({
        email: ['pak3@mail.ru', [ Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$'),
        ]) ] ],
        password: ['lolkek', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ])],
        confirmPassword: [''],
   ***REMOVED*****REMOVED*** { validator: PasswordValidator.areEqual });
    }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Async user sign-in/sign-up + if successful then redirect to store.
  ***REMOVED*** @param formValues - user email + password.
  ***REMOVED***/
  public onSubmit(formValues: CredentialsModel): void {
    if (this.isSigningUp) {
      this.authService
        .signUp(formValues).pipe(take(1))
        .subscribe(
          (userData: UserCredential) => {
            userData.user.sendEmailVerification();
            this.notifications.showSuccess('You`ve registered your account', 'Success');
            this.router.navigate(['/store']);
       ***REMOVED*****REMOVED***
          (error: FirebaseError) => {
            switch(error.code){
              case 'auth/email-already-in-use':
                this.notifications.showError('Please, input another email', 'Email exists');
                break;
              // TODO: write another cases.
              default:
                alert(error);
                break;
            }
          }
        );
    } else {
      this.authService
        .signIn(formValues).pipe(take(1))
        .subscribe(
          () => {
            this.notifications.showSuccess('You`ve signed-in', 'Success');
            this.router.navigate(['/store']);
       ***REMOVED*****REMOVED***
          (error: FirebaseError) => {
            switch(error.code) {
              case 'auth/wrong-password':
                this.notifications.showError('Please, input password correctly', error.message);
                break;
              case 'auth/user-not-found':
                this.notifications.showError('Please, input login correctly', error.message);
                break;
              default:
                alert(error);
                break;
            }
          }
        );
    }
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Removes confirmation password field and getting the behaviour back to sign-in.
  ***REMOVED***/
  switchToSignIn(): void {
    this.formControls.confirmPassword.setValue('');
    this.formControls.confirmPassword.clearValidators();
    this.formControls.confirmPassword.updateValueAndValidity();
    this.isSigningUp = !this.isSigningUp;
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Adds confirmation password field and sign-up behaviour to page.
  ***REMOVED***/
  switchToSignUp(): void {
    this.formControls.confirmPassword.setValidators(Validators.required);
    this.isSigningUp = !this.isSigningUp;
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** For checking if the confirm password === password.
  ***REMOVED***/
  onPasswordInput(): void {
      if (this.isSigningUp && this.formData.hasError('nomatch')) {
        this.formControls.confirmPassword.setErrors([{'nomatch': true}]);
      }
      else {
        this.formControls.confirmPassword.setErrors(null);
      }
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** All controls that have a formControlName in html file.
  ***REMOVED*** @returns FormGroup.controls.
  ***REMOVED***/
  get formControls(): { [key: string]: AbstractControl; } { return this.formData.controls; }

}
