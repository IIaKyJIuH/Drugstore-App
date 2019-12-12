import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';
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

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Form data: email + password.
 ***REMOVED*****REMOVED***/
  public formData: FormGroup;

  isSigningUp = false;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param auth - my authorization service.
 ***REMOVED*****REMOVED*** @param router - responsible for redirecting user.
 ***REMOVED*****REMOVED*** @param formBuilder - includes form data.
 ***REMOVED*****REMOVED***/
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifications: NotificationService,
  ) {
      this.formData  =  this.formBuilder.group({
        email: ['user123@po.chta', [ Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]) ] ],
        password: ['user123', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ])],
        confirmPassword: [''],
  ***REMOVED*****REMOVED*****REMOVED*** { validator: PasswordValidator.areEqual });
    }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Async user login + if successful then redirect to main.
 ***REMOVED*****REMOVED*** @param formValues - user email + password.
 ***REMOVED*****REMOVED***/
  public onSubmit(formValues: CredentialsModel): void {
    if (this.isSigningUp) {
      this.authService
      .signUp(formValues).pipe(take(1))
      .subscribe(
        () => {
          this.notifications.showSuccess('You`ve registered and signed-in', 'Success');
          this.router.navigate(['/main']);
    ***REMOVED*****REMOVED*****REMOVED***
        (error: FirebaseError) => {
          switch(error.code){
            case 'auth/email-already-in-use': 
              this.notifications.showError('Please, input another email', 'Email exists');
              break;
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
            this.router.navigate(['/main']);
      ***REMOVED*****REMOVED*****REMOVED***
          (error: FirebaseError) => {
            switch(error.code) {
              case 'auth/wrong-password': 
                this.notifications.showError('Please, input password correctly', 'Wrong password');
                break;
              case 'auth/user-not-found':
                this.notifications.showError('Please, input login correctly', 'User doesn`t exists');
                break;
              default:
                alert(error);
                break;
            }
          }
        );
    }
  }

  switchToSignIn(): void {
    this.formControls.confirmPassword.setValue('');
    this.formControls.confirmPassword.clearValidators();
    this.formControls.confirmPassword.updateValueAndValidity();
    this.isSigningUp = !this.isSigningUp;
  }

  switchToSignUp(): void {
    this.formControls.confirmPassword.setValidators(Validators.required);
    this.isSigningUp = !this.isSigningUp;
  }

  onPasswordInput(): void {
      if (this.isSigningUp && this.formData.hasError('nomatch')) {
        this.formControls.confirmPassword.setErrors([{'nomatch': true}]);
      }
      else {
        this.formControls.confirmPassword.setErrors(null);
      }
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** All controls that have a formControlName in html file.
 ***REMOVED*****REMOVED*** @returns FormGroup.controls.
 ***REMOVED*****REMOVED***/
  get formControls(): { [key: string]: AbstractControl; } { return this.formData.controls; }

}
