import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as featureActions from './actions';
import { SettingUserService } from 'src/app/core/services/setting-user/setting-user.service';

@Injectable()
export class PrivacySettingEffects {
  constructor(
    private actions$: Actions,
    private setting: SettingUserService,
  ) { }


  loadSettingVisibility$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadSettingVisibility>(featureActions.ActionTypes.LOAD_SETTING_VISIBILITY),
    switchMap(action => this.setting.GetVisibility()
      .pipe(
        map(response => new featureActions.LoadSettingVisibilitySuccess(response.PrivacySetting)),
        catchError(err => observableOf(new featureActions.LoadSettingVisibilityFail(err))),
      ))
    )
  );

  changeSettingVisibility$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ChangeVisibility>(featureActions.ActionTypes.CHANGE_VISIBILITY),
    switchMap(action => this.setting.ChangeVisibility(action.visibility)
      .pipe(
        map(response => new featureActions.ChangeVisibilitySuccess(response.PrivacySetting)),
        catchError(err => observableOf(new featureActions.ChangeVisibilityFail(err))),
      ))
    )
  );

}
