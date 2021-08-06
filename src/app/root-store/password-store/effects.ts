import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import * as featureActions from './actions';
import { CoreService } from 'src/app/core/services/core/core.service';

@Injectable()
export class PasswordEffects {
  constructor(
    private actions$: Actions,
    private register: CoreService,
  ) { }

  passwordChange$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ChangePassword>(featureActions.ActionTypes.CHANGE_PASSWORD),
    switchMap(action =>
      this.register.PasswordUpdate(action.payload)
        .pipe(
          map(response => new featureActions.ChangePasswordSuccess(response.message)),
          catchError(err => observableOf(new featureActions.ChangePasswordFail(err))),
        )
    )
  ));

}
