import { Action } from '@ngrx/store';
import { Room } from 'src/app/core/models/messenger/room.model';

export enum ActionTypes {

  LOAD_CURRENT_ROOM = '@current_room/load',
  LOAD_CURRENT_ROOM_SUCCESS = '@current_room/load_success',
  LOAD_CURRENT_ROOM_FAIL = '@current_room/load_fail',

  ADD_CURRENT_ROOM = '@current_room/add',
  ADD_CURRENT_ROOM_SUCCESS = '@current_room/add_success',
  ADD_CURRENT_ROOM_FAIL = '@current_room/add_fail',

  UPDATE_NOTIFICATION = '@current_room_notification/update',
  RESET_NOTIFICATION = '@current_room_notification/reset',
  DELETE_ROOM = '@current_room/pull',
  DELETE_ROOM_BY_PROFILE = '@current_room/pull_by_profile',
  ADD_ROOM = '@list_current_room/add'

}

export class addRoom implements Action {
  readonly type = ActionTypes.ADD_ROOM
  constructor(public payload: Room) {}
}

export class addCurrentRoom implements Action {
  readonly type = ActionTypes.ADD_CURRENT_ROOM
  constructor(public id: string) {}
}

export class addCurrentRoomSuccess implements Action {
  readonly type = ActionTypes.ADD_CURRENT_ROOM_SUCCESS
  constructor(public payload: Room) {}
}

export class addCurrentRoomFail implements Action {
  readonly type = ActionTypes.ADD_CURRENT_ROOM_FAIL
  constructor(public payload: any) {}
}

export class deleteRoomByProfile implements Action {
  readonly type = ActionTypes.DELETE_ROOM_BY_PROFILE
  constructor(public id: string) {}
}

export class DeleteRoom implements Action {
  readonly type = ActionTypes.DELETE_ROOM
  constructor(public id: string) {}
}

export class resetNotification implements Action {
  readonly type = ActionTypes.RESET_NOTIFICATION
  constructor(public id: string) { }
}

export class updateNotification implements Action {
  readonly type = ActionTypes.UPDATE_NOTIFICATION
  constructor(public id: string) { }
}

export class loadCurrentRoom implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_ROOM
  constructor() {}
}

export class loadCurrentRoomSuccess implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_ROOM_SUCCESS
  constructor(public payload: Room[]) {}
}

export class loadCurrentRoomFail implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_ROOM_FAIL
  constructor(public payload: any) {}
}

export type ActionsMessage =
| loadCurrentRoom
| loadCurrentRoomSuccess
| loadCurrentRoomFail
| addCurrentRoom
| addCurrentRoomSuccess
| addCurrentRoomFail
| updateNotification
| resetNotification
| DeleteRoom
| deleteRoomByProfile
| addRoom
