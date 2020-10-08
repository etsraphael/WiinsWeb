import { UserExtend } from '../../core/models/baseUser/userExtend.model'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { filter, debounceTime, distinctUntilChanged, skipWhile, take } from 'rxjs/operators'
import { DatePipe } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'
import { Observable, Subscription } from 'rxjs'
import { UserModel } from '../../core/models/baseUser/user.model'
import { Store, select } from '@ngrx/store'
import {
  UserStoreActions, UserStoreSelectors, RootStoreState,
  SearchPseudoStoreActions, SearchPseudoStoreSelectors
} from 'src/app/root-store'
import { MatSnackBar, MatDialog, MatSnackBarRef, SimpleSnackBar } from '@angular/material'
import { ModalTOUComponent } from 'src/app/core/modal/modal-t-o-u/modal-t-o-u.component'
import { DeviceDetectorService } from 'ngx-device-detector'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  // form
  registerForm: FormGroup
  maxDate = new Date(Date.now())
  dateFormValid: string
  birthDate: any
  picker: string

  // store
  message$: Observable<string>
  loading$: Observable<boolean>
  user$: Observable<UserModel>

  // pseudo search
  pseudoValid$: Observable<Boolean>

  // subscription
  userErrorSubscription: Subscription

  constructor(
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
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
      birthDate: ['', [Validators.required, this.majorValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      tou: [false]
    })

    // check the valid date
    this.dateFormValid = this.datepipe.transform(
      this.birthDate,
      'yyyy-MM-dd'
    )

    // listener for each action
    this.listenerPseudo()
    this.listenerStore()

  }

  majorValidator(): ValidatorFn {
    // valid if the user is a more than 18 years
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== '') {
        const diff = (Date.now().valueOf() - control.value) / (1000 * 60 * 60 * 24) / 365
        if (diff > 16) return { 'ageValid': { valid: true } }
        else return null
      }
      return null
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void | MatSnackBarRef<SimpleSnackBar> {

    // verify the term of use
    if (!this.registerForm.get('tou').value) return this.showErrorMessage('ERROR-MESSAGE.y-h-to-accept-the-tou')

    // verify the age
    if (!this.registerForm.get('birthDate').invalid) return this.showErrorMessage('ERROR-MESSAGE.16-years-minimum')

    // verify the pseudo
    this.pseudoValid$.pipe(take(1)).subscribe(val => {
      if (val == false) return this.showErrorMessage('ERROR-MESSAGE.Pseudo-already-exist')
    })

    // verify each email and pseudo
    if (this.registerForm.get('email').invalid || this.registerForm.get('pseudo').invalid) {
      return this.showErrorMessage('ERROR-MESSAGE.Els-are-incorrects')
    }

    // we ajust the format for the date
    const date = this.datepipe.transform(
      this.registerForm.get('birthDate').value,
      'yyyy-MM-dd'
    )

    let newUser = new UserModel(
      null,
      this.registerForm.get('pseudo').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value
    )

    // send the new user
    this.store$.dispatch(new UserStoreActions.AddUser(newUser, new UserExtend('en', new Date(date))))

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
    this.dialog.open(ModalTOUComponent, { panelClass: ['col-md-7', 'col-sm-12', 'col-12'] })
  }

}
