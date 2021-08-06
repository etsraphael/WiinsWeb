import { NotificationService } from '../../core/services/notification/notification.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import { Router } from '@angular/router';
import { ActionsNumberNotification } from './actions';

@Injectable()
export class NotificationFeatureEffects {
  constructor(
    private dataService: NotificationService,
    private router: Router,
    private actions$: Actions) { }

  loadNumberRequest$: Observable<ActionsNumberNotification> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadNumberRequest>(featureActions.ActionTypes.LOAD_NUMBER_REQUEST),
    switchMap(action => this.dataService.GetNumberRequest().pipe(
      map(items => new featureActions.LoadNumberRequestSuccess(items.number)),
      catchError(error => observableOf(new featureActions.LoadNumberRequestFail(error)))
    ))
  ));

  initializeNumberRequest$: Observable<ActionsNumberNotification> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.InitilizeNumberRequest>(featureActions.ActionTypes.INITIALIZE_NUMBER_REQUEST),
    switchMap(action => this.dataService.RequestChecked().pipe(
      map(items => new featureActions.InitilizeNumberRequestSuccess(items.seen)),
      catchError(error => observableOf(new featureActions.InitilizeNumberRequestFail(error)))
    ))
  ));

  loadNumberActivity$: Observable<ActionsNumberNotification> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadNumberActivity>(featureActions.ActionTypes.LOAD_NUMBER_ACTIVITY),
    switchMap(action => this.dataService.GetNumberAcitivity().pipe(
      map(items => new featureActions.LoadNumberActivitySuccess(items.number)),
      catchError(error => observableOf(new featureActions.LoadNumberActivityFail(error)))
    ))
  ));

  initializeNumberActivity$: Observable<ActionsNumberNotification> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.InitilizeNumberActivity>(featureActions.ActionTypes.INITIALIZE_NUMBER_ACTIVITY),
    switchMap(action => this.dataService.AcitivityChecked().pipe(
      map(items => new featureActions.InitilizeNumberActivitySuccess(items.seen)),
      catchError(error => observableOf(new featureActions.InitilizeNumberActivityFail(error)))
    ))
  ));

}
