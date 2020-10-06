import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordConfirmValidations } from './password-confirm.validations';
import { Store } from '@ngrx/store';
import { RootStoreState, PasswordStoreActions, PasswordStoreSelectors } from 'src/app/root-store';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})

export class UpdatePasswordComponent implements OnInit {

  // default 
  loading = false;
  submitted = false;

  // form password
  passwordForm: FormGroup;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(
    private store$: Store<RootStoreState.State>,
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    // form & password verification
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmNewPassword: ['', [Validators.required]],
    },
      { validators: PasswordConfirmValidations.passwordNotMatch }
    )

  }

  get f() { return this.passwordForm.controls }

  changePassword(): void | MatSnackBarRef<SimpleSnackBar> {

    // check the valid password
    if (this.passwordForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'), null,
        { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    // send the password
    this.store$.dispatch(new PasswordStoreActions.ChangePassword(this.passwordForm.value));

    // to select the response and do some actions
    this.store$.select(
      PasswordStoreSelectors.select,
    ).subscribe(action => {

      if (action === 'password_changed') {
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.update-is-done'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
      }
      else {
        this._snackBar.open(
          this.translate.instant('SETTING.password.Old-password-is-invalid'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
      }
      this.passwordForm.reset();
    })

  }

}
