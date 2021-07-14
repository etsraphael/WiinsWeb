import { UserExtend } from '../../core/models/baseUser/userExtend.model'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { filter, debounceTime, distinctUntilChanged, skipWhile, take } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { Observable, Subscription } from 'rxjs'
import { UserModel } from '../../core/models/baseUser/user.model'
import { Store, select } from '@ngrx/store'
import {
  UserStoreActions, UserStoreSelectors, RootStoreState,
  SearchPseudoStoreActions, SearchPseudoStoreSelectors
} from 'src/app/root-store'
import { ModalTOUComponent } from 'src/app/core/modal/modal-t-o-u/modal-t-o-u.component'
import { DeviceDetectorService } from 'ngx-device-detector'
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { PasswordConfirmValidations } from 'src/app/home-setting/update-password/password-confirm.validations'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  // form
  registerForm: FormGroup

  // store
  message$: Observable<string>
  loading$: Observable<boolean>
  user$: Observable<UserModel>

  // pseudo search
  pseudoValid$: Observable<Boolean>

  // subscription
  userErrorSubscription: Subscription

  // Password & COnfirm Password
  show: boolean = false;
  confirmShow: boolean = false;
  changeTypePswd: string = 'password';
  changeTypeConfirmPswd: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {

    // register form
    this.registerForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^\S*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]],
      tou: [false]
    }, { validators: PasswordConfirmValidations.passwordNotMatchSignUp }
    )

    // listener for each action
    this.listenerPseudo()
    this.listenerStore()

  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void | MatSnackBarRef<SimpleSnackBar> {

    // verify the term of use
    if (!this.registerForm.get('tou').value) return this.showErrorMessage('ERROR-MESSAGE.y-h-to-accept-the-tou')

    if (this.registerForm.get('password1').value !== this.registerForm.get('password2').value) {
      return this.showErrorMessage('ERROR-MESSAGE.Password-not-identical')
    }

    // verify the pseudo
    this.pseudoValid$.pipe(take(1)).subscribe(val => {
      if (val == false) return this.showErrorMessage('ERROR-MESSAGE.Pseudo-already-exist')
    })

    // verify each email and pseudo
    if (this.registerForm.get('email').invalid || this.registerForm.get('pseudo').invalid) {
      return this.showErrorMessage('ERROR-MESSAGE.Els-are-incorrects')
    }

    let newUser = new UserModel(
      null,
      this.registerForm.get('pseudo').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password1').value
    )

    let lg: string
    if (!this.translate.currentLang) { lg = 'en' }
    else { lg = this.translate.currentLang }

    // send the new user
    this.store$.dispatch(new UserStoreActions.AddUser(newUser, new UserExtend(lg)))

  }

  showErrorMessage(message: string): MatSnackBarRef<SimpleSnackBar> {
    // to show the error snackbar
    return this._snackBar.open(
      this.translate.instant(message), null,
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )
  }

  listenerStore(): void {

    // to select the user
    this.user$ = this.store$.pipe(
      select(UserStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to select the loading progression
    this.loading$ = this.store$.pipe(
      select(UserStoreSelectors.selectIsLoading),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to select the response
    this.message$ = this.store$.pipe(
      select(UserStoreSelectors.selectMessage),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to do some action after the response
    this.userErrorSubscription = this.store$.pipe(
      select(UserStoreSelectors.selectError),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    ).subscribe((error: string) => {
      if (error == 'email_already_exist') return this.showErrorMessage('ERROR-MESSAGE.Email_already_exist')
      else return this.showErrorMessage('ERROR-MESSAGE.one-error')
    })
  }

  listenerPseudo(): void {

    // to select the validity of the pseudo
    this.pseudoValid$ = this.store$.pipe(
      select(SearchPseudoStoreSelectors.select),
      skipWhile(val => val == null)
    )

    // to update the pseudo request
    this.registerForm.get('pseudo').valueChanges
      .pipe(
        filter(value => value.length > 3),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.store$.dispatch(new SearchPseudoStoreActions.SearchPseudo(val))
      })
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    if (this.userErrorSubscription) this.userErrorSubscription.unsubscribe()
  }

  openTOU() {
    // open the modal for the term of use
    this.dialog.open(ModalTOUComponent, { panelClass: ['col-md-10', 'col-sm-12', 'col-12'] })
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