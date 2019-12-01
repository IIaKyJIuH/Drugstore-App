import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';

***REMOVED****
***REMOVED*** Signing-in page for user to get access for other app abilities.
***REMOVED***/
@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.css'],
})
export class SignInComponent {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Form data: email + password.
 ***REMOVED*****REMOVED***/
  public loginForm: FormGroup;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** .ctor
 ***REMOVED*****REMOVED*** @param auth - my authorization service.
 ***REMOVED*****REMOVED*** @param router - responsible for redirecting user.
 ***REMOVED*****REMOVED*** @param formBuilder - includes form data.
 ***REMOVED*****REMOVED***/
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
      this.loginForm  =  this.formBuilder.group({
        email: ['heh@mda.ru', [ Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]) ] ],
        password: ['lolkek', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(13),
        ])],
      });
    }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Async user login + if successful then redirect him to scanner page.
 ***REMOVED*****REMOVED*** @param formValues - user email + password.
 ***REMOVED*****REMOVED***/
  public onSubmit(formValues: CredentialsModel): void {
    this.auth
      .signIn(formValues).pipe(take(1))
      .subscribe(() => this.router.navigate(['/tabs']));
  }

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** All controls that have a formControlName in html file.
 ***REMOVED*****REMOVED*** @returns FormGroup.controls.
 ***REMOVED*****REMOVED***/
  get formControls(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

}
