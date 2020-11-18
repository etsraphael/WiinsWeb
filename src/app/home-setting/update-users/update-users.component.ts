import { ProfileFeatureStoreSelectors, RootStoreState, MyUserStoreActions, ProfileFeatureStoreActions } from 'src/app/root-store'
import { Store, select } from '@ngrx/store'
import { ProfileModel, BtnFollow } from '../../core/models/baseUser/profile.model'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { filter, skipWhile } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { DatePipe } from '@angular/common'
import * as _ from 'lodash'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss']
})

export class UpdateUsersComponent implements OnInit {

  // default
  baseUrl = environment.baseUrl;

  // get user & profil
  profile$: Observable<ProfileModel>;

  // send the form
  registerForm: FormGroup;
  maxDate = new Date(Date.now());
  birthDate: any;
  dateFormValid: string;

  constructor(
    private store$: Store<RootStoreState.State>,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // initialize form for the date
    this.dateFormValid = this.datepipe.transform(
      this.birthDate,
      'yyyy-MM-dd'
    );

    // we initialise the form
    this.registerForm = this.formBuilder.group({
      pseudo: ['', [Validators.minLength(4), Validators.pattern(/^\S*$/)]],
      birthDate: [null, this.majorValidator],
      email: ['', [Validators.email]],
      introduction: ['']
    })

    // to select the profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile),
      skipWhile(profile => profile == null)
    )

  }

  majorValidator(control: AbstractControl) {

    // to check if the date is under 18 old
    if (control.value !== null) {
      const diff = (Date.now().valueOf() - control.value) / (1000 * 60 * 60 * 24) / 365
      if (diff < 18) return { 'ageValid': { valid: false } }
      else return null
    }
    return null

  }

  udapteInfo() {

    // if the charactere are valid
    if (_.isEmpty(_.pickBy(this.registerForm.value, _.identity))) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.No-changes-hv-been-made'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // if the form are valid
    if (!this.registerForm.valid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // send the update
    else this.store$.dispatch(new MyUserStoreActions.UpdateUser(_.pickBy(this.registerForm.value, _.identity)))

  }

  resetInfo() {
    // reset all the info
    this.registerForm.reset()
  }

  get f() { return this.registerForm.controls }

  changeFriendOption(value: boolean) {
    // change the visibility button for the friends
    this.store$.dispatch(new ProfileFeatureStoreActions.ChangeBtnFollow(new BtnFollow(value, undefined)))
  }

  changeViewverOption(value: boolean) {
    // change the visibility button for the followers
    this.store$.dispatch(new ProfileFeatureStoreActions.ChangeBtnFollow(new BtnFollow(undefined, value)))
  }

}
