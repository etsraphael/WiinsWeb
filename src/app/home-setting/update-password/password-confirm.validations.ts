import { AbstractControl } from '@angular/forms';

export class PasswordConfirmValidations {

  static passwordNotMatch(control: AbstractControl) {

    const password = control.get('newPassword').value;
    const confirmPassword = control.get('confirmNewPassword').value;

    if (password === null || confirmPassword === null) {
      control.get('confirmNewPassword').setErrors({ passwordNotMatch: false }); return
    }

    if (password !== confirmPassword) {
      control.get('confirmNewPassword').setErrors({ passwordNotMatch: true }); return
    }

    if (password === confirmPassword) {
      control.get('confirmNewPassword').setErrors(null); return
    }

  }
}
