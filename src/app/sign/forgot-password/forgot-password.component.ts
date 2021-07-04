import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignAnimation } from 'src/assets/route-animation/sign-animation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SettingUserService } from 'src/app/core/services/setting-user/setting-user.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

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

  //Forgot Password & Send Mail
  forgotPwsdContainer: boolean = true
  sendMailContainer:boolean = false

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

  onSubmit() {

    // check if the mail is valid
    if (this.emailForm.invalid) return this.invalidMessageAlert()
    this.loading = true

    // send the request
    this.passwordSub = this.settingUserService.resetPasswordEmail(this.emailForm.get('email').value)
      .pipe(take(1))
      .subscribe(
        () => {
          this.emailSended = true
          this.loading = false
        },
        error => {
          if (error == 'address_invalid') return this.invalidMessageAlert()
          else this.loading = false
        }
      )

      if(this.forgotPwsdContainer === true) {
        this.sendMailContainer = true
        this.forgotPwsdContainer = false
      }

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
