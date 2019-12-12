import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CredentialsModel } from 'src/app/core/services/models/credentials-model';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
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

  isCurrentPasswordRight: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notifications: NotificationService
  ) {
    this.emailChangeForm = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ] 
    });
    this.passwordChangeForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ])],
      confirmPassword: ['', Validators.required],
    },
    { validator: PasswordValidator.areEqual });
  }

  onEmailChangeSubmit(emailFormValues: Partial<CredentialsModel>): void {
    const newEmail = emailFormValues.email;
    if (newEmail === this.currentUserEmail) {
      this.notifications.showError('Actually, there is nothing to change', 'Logic error');
      return;
    }
    this.authService.changeUserEmail(emailFormValues.email).pipe(take(1)).subscribe(
      () => {
        this.notifications.showSuccess('Your email was successfully changed', 'Success');
      },
      (err: Error) => {
        this.notifications.showError('Something went wrong', err.message);
      }
    );
  }

  onPasswordChangeSubmit(passwordFormValues: any): void {
    const newPassword = passwordFormValues.password;
    this.authService.changeUserPassword(newPassword).pipe(take(1)).subscribe(
      () => {
        this.notifications.showSuccess('Your password was successfully changed', 'Success');
      },
      (err: Error) => {
        this.notifications.showError('Something went wrong', err.message);
      },
      () => {
        this.passwordChangeForm.reset();
      }
    )
  }

  get currentUserEmail(): string {
    return this.authService.getUserData().email;
  }

  checkIfItIsCurrentPassword(password: string): void {
    this.authService.isCurrentPassword(password).pipe(
      take(1)
    ).subscribe(
      () => {
        this.isCurrentPasswordRight = true;
      },
      (err) => {
        this.notifications.showError('Ooops', 'Wrong password');
        this.isCurrentPasswordRight = false;
      });
  }

  onPasswordInput(): void {
    if (this.passwordChangeForm.hasError('nomatch')) {
      this.passwordControls.confirmPassword.setErrors([{'nomatch': true}]);
    }
    else {
      this.passwordControls.confirmPassword.setErrors(null);
    }
}

  /**
   * All password controls.
   * @returns FormGroup.controls.
   */
  get passwordControls(): { [key: string]: AbstractControl; } { return this.passwordChangeForm.controls; }

}
