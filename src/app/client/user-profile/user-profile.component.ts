import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { PasswordValidator } from 'src/app/core/services/registration/password-validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  /**
   * Form for email changing
   */
  emailChangeForm: FormGroup;

  /**
   * Form for changing user password.
   */
  passwordChangeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.emailChangeForm = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ] 
    });
    this.passwordChangeForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(12),
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(12),
      ])],
    }, 
    { validator: PasswordValidator.areEqual });
   }

  get currentUserEmail(): string {
    return this.authService.getUserData().email;
  }

  /**
   * All password controls.
   * @returns FormGroup.controls.
   */
  get passwordControls(): { [key: string]: AbstractControl; } { return this.passwordChangeForm.controls; }

}
