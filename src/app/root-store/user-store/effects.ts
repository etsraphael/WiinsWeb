import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import * as featureActions from './actions';
import { CoreService, ResponseGetUserAndProfile } from 'src/app/core/services/core/core.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private coreService: CoreService
  ) { }

  registUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddUser>(featureActions.ActionTypes.ADD_USER),
    switchMap((action: featureActions.AddUser) => this.coreService.UserRegister(action.payload, action.payloadDetail).pipe(
      map((response: ResponseGetUserAndProfile) => new featureActions.AddUserSuccess(response.user)),
      catchError(err => observableOf(new featureActions.AddUserFail(err)))
    )))
  )

}
