import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';
import { PasswordValidator } from 'src/app/core/services/registration/password-validator';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';

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

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.registrationForm = this.formBuilder.group({
     email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.required,
      ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ])],
    confirmPassword: ['', Validators.required],
  }, { validator: PasswordValidator.areEqual });

  }

  /**
   * Async user login + if successful then redirect him to scanner page.
   * @param formValues - user email + password.
   */
  public onSubmit(formValues: CredentialsModel): void {
    this.registrationService
      .register(formValues).pipe(take(1))
      .subscribe(() => this.router.navigate(['/tabs']));
  }

  /**
   * All controls that have a formControlName in html file.
   * @returns FormGroup.controls.
   */
  get formControls(): { [key: string]: AbstractControl; } { return this.registrationForm.controls; }

}
