import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';
import { PasswordValidator } from 'src/app/core/services/registration/password-validator';

***REMOVED****
***REMOVED*** For user registration.
***REMOVED***/
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.css'],
})
export class SignUpComponent {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Form data: email + password.
 ***REMOVED*****REMOVED***/
  public registrationForm: FormGroup;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param authService - for authentication purposes.
 ***REMOVED*****REMOVED*** @param formBuilder - includes form data.
 ***REMOVED*****REMOVED*** @param router - responsible for redirecting user.
 ***REMOVED*****REMOVED***/
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.registrationForm = this.formBuilder.group({
     email: ['lol@kek.ru', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.required,
      ])],
    password: ['lolkek', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ])],
    confirmPassword: ['lolkek', Validators.required],
***REMOVED*** { validator: PasswordValidator.areEqual });

  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Async user login + if successful then redirect him to scanner page.
 ***REMOVED*****REMOVED*** @param formValues - user email + password.
 ***REMOVED*****REMOVED***/
  public onSubmit(formValues: CredentialsModel): void {
    this.authService
      .signUp(formValues).pipe(take(1))
      .subscribe(
        () => this.router.navigate(['/main']),
        (alert)
        );
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** All controls that have a formControlName in html file.
 ***REMOVED*****REMOVED*** @returns FormGroup.controls.
 ***REMOVED*****REMOVED***/
  get formControls(): { [key: string]: AbstractControl; } { return this.registrationForm.controls; }

}
