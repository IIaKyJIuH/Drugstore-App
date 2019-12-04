import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';

/**
 * Signing-in page for user to get access for other app abilities.
 */
@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.css'],
})
export class SignInComponent {

  /**
   * Form data: email + password.
   */
  public loginForm: FormGroup;

  /**
   * .ctor
   * @param auth - my authorization service.
   * @param router - responsible for redirecting user.
   * @param formBuilder - includes form data.
   */
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
      this.loginForm  =  this.formBuilder.group({
        email: ['admin123@po.chta', [ Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]) ] ],
        password: ['admin123', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(13),
        ])],
      });
    }

  /**
   * Async user login + if successful then redirect to main.
   * @param formValues - user email + password.
   */
  public onSubmit(formValues: CredentialsModel): void {
    this.auth
      .signIn(formValues).pipe(take(1))
      .subscribe(
        () => this.router.navigate(['/main'])
      );
  }

  /**
   * Go to sign-up component.
   */
  goToSignUpComponent(): void {
    this.router.navigate(['/sign-up']);
  }

  /**
   * All controls that have a formControlName in html file.
   * @returns FormGroup.controls.
   */
  get formControls(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

}
