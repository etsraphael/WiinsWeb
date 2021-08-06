import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import { ActionsNotifications } from './actions';

@Injectable()
export class NotificationsEffects {
  constructor( private dataService: NotificationService, private actions$: Actions) { }

  loadAdmins$: Observable<ActionsNotifications> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadNotifications>(featureActions.ActionTypes.LOAD_NOTIFICATIONS),
    switchMap(action => this.dataService.GetNotifications(action.page).pipe(
      map(items => new featureActions.LoadNotificationsSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadNotificationsFail(error)))
    ))
  ));

  seenNotification$: Observable<ActionsNotifications> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.NotificationSeen>(featureActions.ActionTypes.NOTIFICATION_SEEN),
    switchMap(action => this.dataService.NotificationSeenWithId(action.id).pipe(
      map(items => new featureActions.NotificationSeenSuccess(items.notification._id)),
      catchError(error => observableOf(new featureActions.NotificationSeenFail(error)))
    ))
  ));

}
