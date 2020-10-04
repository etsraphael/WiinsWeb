import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material'
import { TeamUpdate } from '../../models/confirmation/teamUpdate'
import { RootStoreState, OneGroupFeatureStoreActions, OneGroupFeatureStoreSelectors } from 'src/app/root-store'
import { Store, select } from '@ngrx/store'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-group-validation',
  templateUrl: './group-validation.component.html',
  styleUrls: ['./group-validation.component.scss']
})
export class GroupValidationComponent implements OnInit {

  // form
  form: FormGroup

  // store
  error$: Observable<string>

  constructor(
    public dialogRef: MatDialogRef<GroupValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamUpdate,
    private formBuilder: FormBuilder,
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // password form
    this.form = this.formBuilder.group({ password: ['', [Validators.required]] })

    // to select the error
    this.error$ = this.store$.pipe(
      select(OneGroupFeatureStoreSelectors.selectError),
      filter(value => value !== undefined),
    )

  }

  get f() { return this.form.controls }

  confirm() {

    // send the form if it's not correct
    if (this.form.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-type-yr-password'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }

    // send the action
    switch (this.data.catagorie) {
      case 'leave':
      case 'delete':
      case 'demote':
      case 'promote':
      case 'replacePr':
        return this.store$.dispatch(new OneGroupFeatureStoreActions.ChangeRole(this.data, this.f.password.value))
    }

  }

}
