import { Component, OnInit, Inject } from '@angular/core'
import { AdminsFeatureStoreActions, RootStoreState, AdminsFeatureStoreSelectors } from 'src/app/root-store'
import { TeamUpdate } from '../../models/confirmation/teamUpdate'
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-management-team',
  templateUrl: './management-team.component.html',
  styleUrls: ['./management-team.component.scss']
})

export class ManagementTeamComponent implements OnInit {

  // form
  form: FormGroup

  // store
  error$: Observable<string>

  constructor(
    public dialogRef: MatDialogRef<ManagementTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamUpdate,
    private formBuilder: FormBuilder,
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // password form
    this.form = this.formBuilder.group({ password: ['', [Validators.required]] })

    // to select an error
    this.error$ = this.store$.pipe(
      select(AdminsFeatureStoreSelectors.selectError),
      filter(value => value !== undefined),
    )

  }

  get f() { return this.form.controls }

  sendComfirmation() {

    // check if it's valid
    if (this.form.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-type-yr-password'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // send the action
    this.store$.dispatch(new AdminsFeatureStoreActions.ChangeRole(this.data, this.f.password.value));
  }

  addMember() {
    // add a member in the group
    this.store$.dispatch(new AdminsFeatureStoreActions.ChangeRole(this.data, null));
  }

}
