import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignAnimation } from 'src/assets/route-animation/sign-animation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SettingUserService } from 'src/app/core/services/setting-user/setting-user.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [SignAnimation]
})

export class ForgotPasswordComponent implements OnInit, OnDestroy {

  // form
  emailForm: FormGroup
  passwordSub: Subscription

  // animation
  emailSended = false
  loading = false
  stateLogin = 'default'

  confirmationSended = false

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private settingUserService: SettingUserService
  ) { }

  ngOnInit() {

    // email form
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

  }

  get f() { return this.emailForm.controls; }

  onSubmit() {

    // check if the mail is valid
    if (this.emailForm.invalid) return this.invalidMessageAlert()
    this.loading = true

    // send the request
    this.passwordSub = this.settingUserService.resetPasswordEmail(this.emailForm.get('email').value)
      .pipe(take(1))
      .subscribe(
        () => {
          this.loading = false
          setTimeout(() => { this.loading = false }, 3000);
          setTimeout(() => { this.confirmationSended = true }, 3000);
        },
        (response: HttpErrorResponse) => {
          if (response.error.message == 'address_invalid') return this.invalidMessageAlert()
          else this.loading = false
        }
      )
  }

  invalidMessageAlert(): | MatSnackBarRef<SimpleSnackBar> {
    // show an error message
    this.stateLogin = 'error'
    this.loading = false
    setTimeout(() => { this.stateLogin = 'default' }, 3000);
    return this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.Email-invalid'), null,
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      }
    )
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    if (this.passwordSub) this.passwordSub.unsubscribe()
  }

}
