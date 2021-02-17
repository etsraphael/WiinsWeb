import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as featureActions from './actions';

@Injectable()
export class ModalStateEffects {

  constructor( private actions$: Actions ) { }

  // @Effect()
  // closeModal$: Observable<Action> = this.actions$.pipe(
  //   ofType<featureActions.ChangePassword>(featureActions.ActionTypes.CHANGE_PASSWORD),
  //   switchMap(action =>
  //     this.register.PasswordUpdate(action.payload)
  //       .pipe(
  //         map(response => new featureActions.ChangePasswordSuccess(response.message)),
  //         catchError(err => observableOf(new featureActions.ChangePasswordFail(err))),
  //       )
  //   )
  // );

}
