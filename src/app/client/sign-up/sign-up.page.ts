import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';
import { PasswordValidator } from 'src/app/core/services/registration/password-validator';

/**
 * For user registration.
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.css'],
})
export class SignUpComponent {

  /**
   * Form data: email + password.
   */
  public registrationForm: FormGroup;

  /**
   * .ctor
   * @param authService - for authentication purposes.
   * @param formBuilder - includes form data.
   * @param router - responsible for redirecting user.
   */
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
  }, { validator: PasswordValidator.areEqual });

  }

  /**
   * Async user login + if successful then redirect him to scanner page.
   * @param formValues - user email + password.
   */
  public onSubmit(formValues: CredentialsModel): void {
    this.authService
      .signUp(formValues).pipe(take(1))
      .subscribe(
        () => this.router.navigate(['/main']),
        (alert)
        );
  }

  /**
   * All controls that have a formControlName in html file.
   * @returns FormGroup.controls.
   */
  get formControls(): { [key: string]: AbstractControl; } { return this.registrationForm.controls; }

}
