import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, SettingStoreActions, SettingStoreSelectors } from 'src/app/root-store';
import { PrivacySetting } from 'src/app/core/models/baseUser/privacySetting.model';
import { skipWhile, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visibility-main',
  templateUrl: './visibility-main.component.html',
  styleUrls: ['./visibility-main.component.scss']
})

export class VisibilityMainComponent implements OnInit, OnDestroy {

  // upload setting
  setting$: Observable<PrivacySetting>;
  setting: PrivacySetting;
  settingSubscription: Subscription;

  // form
  visibilityForm: FormGroup;

  constructor(
    private store$: Store<RootStoreState.State>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // to get the config setting
    this.store$.dispatch(new SettingStoreActions.LoadSettingVisibility())

    // to select the config setting
    this.setting$ = this.store$.pipe(
      select(SettingStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to subscribe the setting
    this.settingSubscription = this.setting$.subscribe((action: PrivacySetting)=> {
      this.setting = action;
    })

    // initialize the form
    this.visibilityForm = this.formBuilder.group({ visibility: null })

  }

  changeVisibility() {

    // send the actions
    this.store$.dispatch(new SettingStoreActions.ChangeVisibility(this.visibilityForm.value.visibility))

    // to select the response
    this.setting$.subscribe( () => {
      this.visibilityForm.value.visibility = null;
      this._snackBar.open(
        this.translate.instant('VALID-MESSAGE.update-is-done'),
        null, { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      )
    })

  }

  ngOnDestroy() {
    // unsubscribe all var 
    this.settingSubscription.unsubscribe();
  }

}
