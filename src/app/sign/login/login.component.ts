import { Observable, Subscription } from 'rxjs'
import { MyUserStoreActions, MyUserStoreSelectors, ProfileFeatureStoreSelectors } from 'src/app/root-store'
import { Store, select } from '@ngrx/store'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { RootStoreState } from '../../root-store'
import { UserModel } from '../../core/models/baseUser/user.model'
import { SignAnimation } from 'src/assets/route-animation/sign-animation'
import { skipWhile, filter } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { DeviceDetectorService } from 'ngx-device-detector'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SignAnimation]
})

export class LoginComponent implements OnInit, OnDestroy {

  // form
  loginForm: FormGroup

  //ngrx
  user$: Observable<UserModel>
  errorLog$: Observable<any>
  errorSubscription: Subscription
  loading$: Observable<boolean>
  profileLoading$: Observable<boolean>

  //Password 
  show: boolean = false;
  changeTypePswd: string = 'password';

  constructor(
    private store$: Store<RootStoreState.State>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {

    // login form 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    // check the user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // check the loading profile
    this.profileLoading$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectIsLoading),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // select the error message
    this.errorLog$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // select the loading progress
    this.loading$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectIsLoading),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )

    // action to show the error message
    this.errorSubscription = this.errorLog$.subscribe((error: string) => {

      if(error == 'email_or_password_invalid') {
        this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.Pseudo-Or-Email-Incorrect'),
          this.translate.instant('CORE.close'),
          { duration: 5000 }
        )
      }

      if(error == 'account_desactivated'){
        this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.Account-disabled-check-yr-email'),
          this.translate.instant('CORE.close'),
          { duration: 5000 }
        )
      }
    })

  }

  get f() { return this.loginForm.controls }

  onSubmit(): void {
    // send the login request
    if (this.loginForm.invalid) return null
    this.store$.dispatch(new MyUserStoreActions.LoadUser(this.f.email.value, this.f.password.value));
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    if (this.errorSubscription) this.errorSubscription.unsubscribe()
  }

  toggleShow(): void {
  this.show = !this.show;
  if(this.show){
    this.changeTypePswd = 'text';
  } else {
    this.changeTypePswd = 'password';
  }
}

}
