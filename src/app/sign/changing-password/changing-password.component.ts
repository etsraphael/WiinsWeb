import { Component, OnInit } from '@angular/core';
import { SettingUserService } from 'src/app/core/services/setting-user/setting-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PasswordConfirmValidations } from 'src/app/home-setting/update-password/password-confirm.validations';

@Component({
  selector: 'app-changing-password',
  templateUrl: './changing-password.component.html',
  styleUrls: ['./changing-password.component.scss']
})
export class ChangingPasswordComponent implements OnInit {

  // form
  settingForm: FormGroup
  passwordSub: Subscription

  // animation
  loading = false

  // Password & COnfirm Password
  show: boolean = false;
  confirmShow: boolean = false;
  changeTypePswd: string = 'password';
  changeTypeConfirmPswd: string = 'password';

  // Submit Disabled
  disabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private settingUserService: SettingUserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // form for the password
    this.settingForm = this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, {validators: PasswordConfirmValidations.passwordNotMatchSignUp}
    )
  }

  get f() { return this.settingForm.controls; }

  onSubmit() {

    if (this.settingForm.get('password1').value !== this.settingForm.get('password2').value) {
      return this.showErrorMessage('ERROR-MESSAGE.Password-not-identical')
    }

    // check if the password is inferior than 7 char
    if (this.settingForm.get('password1').value.length <= 7) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.8-char-minimum'), null,
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // check if the passwords are the same
    if (this.settingForm.get('password1').value !== this.settingForm.get('password2').value) {
      return this._snackBar.open(
        this.translate.instant('SETTING.password.Erorr-password-different'), null,
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // check if it;s valid 
    if (this.settingForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'), null,
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // show the loading logo
    this.loading = true

    // send the service
    this.settingUserService.changingPassword(
      this.route.snapshot.paramMap.get('token'),
      this.settingForm.get('password1').value
    ).pipe(take(1)).subscribe(
      () => {
        // navigation to the navigation page
        this.router.navigate(['sign/in'])
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.update-is-done'), null,
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        )
      },
      () => {
        // show an error message
        this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'), null,
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        )

        // hide the loading logo
        this.loading = false
      }
    )
  }

  showErrorMessage(message: string): MatSnackBarRef<SimpleSnackBar> {
    // to show the error snackbar
    return this._snackBar.open(
      this.translate.instant(message), null,
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )
  }

  toggleShow(): void {
    this.show = !this.show;
    if(this.show){
      this.changeTypePswd = 'text';
    } else {
      this.changeTypePswd = 'password';
    }
  }
  
    toggleConfirmShow(): void {
    this.confirmShow = !this.confirmShow;
    if(this.confirmShow){
      this.changeTypeConfirmPswd = 'text';
    } else {
      this.changeTypeConfirmPswd = 'password';
    }
  }

}
