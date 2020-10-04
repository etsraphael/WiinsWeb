import { BaseNotification } from 'src/app/core/models/notification/baseNotification.model';
import { Action } from '@ngrx/store';

export enum ActionTypes {

  LOAD_NOTIFICATIONS = '@notifications/load_notifications',
  LOAD_NOTIFICATIONS_FAIL = '@notifications/load_notifications_fail',
  LOAD_NOTIFICATIONS_SUCCESS = '@notifications/load_notifications_success',

  NOTIFICATION_SEEN = '@notification/seen',
  NOTIFICATION_SEEN_FAIL = '@notification/seen_fail',
  NOTIFICATION_SEEN_SUCCESS = '@notification/seen_success',
}

export class LoadNotifications implements Action {
  readonly type = ActionTypes.LOAD_NOTIFICATIONS;
  constructor(public page: string) { }
}

export class LoadNotificationsSuccess implements Action {
  readonly type = ActionTypes.LOAD_NOTIFICATIONS_SUCCESS;
  constructor(public payload: BaseNotification[]) { }
}

export class LoadNotificationsFail implements Action {
  readonly type = ActionTypes.LOAD_NOTIFICATIONS_FAIL;
  constructor(public payload: any) { }
}

export class NotificationSeen implements Action {
  readonly type = ActionTypes.NOTIFICATION_SEEN
  constructor(public id: string) { }
}

export class NotificationSeenSuccess implements Action {
  readonly type = ActionTypes.NOTIFICATION_SEEN_SUCCESS
  constructor(public id: string) { }
}

export class NotificationSeenFail implements Action {
  readonly type = ActionTypes.NOTIFICATION_SEEN_FAIL
  constructor(public payload: any) { }
}

export type ActionsNotifications =
| LoadNotifications
| LoadNotificationsFail
| LoadNotificationsSuccess
| NotificationSeen
| NotificationSeenFail
| NotificationSeenSuccess


