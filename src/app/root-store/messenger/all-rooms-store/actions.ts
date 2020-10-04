import { Action } from '@ngrx/store'
import { Room } from 'src/app/core/models/messenger/room.model'

export enum ActionTypes {

  LOAD_ALL_ROOMS_BY_PAGE = '@all_rooms_by_page/load',
  LOAD_ALL_ROOMS_BY_PAGE_SUCCESS = '@all_rooms_by_page/load_success',
  LOAD_ALL_ROOMS_BY_PAGE_FAIL = '@all_rooms_by_page/load_fail',

  UPDATE_NOTIFICATION = '@room_notification/update',
  RESET_NOTIFICATION = '@room_notification/reset',
  ADD_ROOM = '@list_full_room/add',

  RECEIVE_MESSAGE = '@message/receive',
  DELETE_ROOM = 'room_in_list_user/ delete'
}

export class addRoom implements Action {
  readonly type = ActionTypes.ADD_ROOM
  constructor(public payload: Room) {}
}

export class receiveMessage implements Action {
  readonly type = ActionTypes.RECEIVE_MESSAGE
  constructor(public payload: any) {}
}

export class updateNotification implements Action {
  readonly type = ActionTypes.UPDATE_NOTIFICATION
  constructor(public id: string) { }
}

export class resetNotification implements Action {
  readonly type = ActionTypes.RESET_NOTIFICATION
  constructor(public id: string) { }
}

export class loadAllRoomsByPage implements Action {
  readonly type = ActionTypes.LOAD_ALL_ROOMS_BY_PAGE
  constructor(public page: number) { }
}

export class loadAllRoomsByPageSuccess implements Action {
  readonly type = ActionTypes.LOAD_ALL_ROOMS_BY_PAGE_SUCCESS
  constructor(public payload: Room[]) { }
}

export class loadAllRoomsByPageFail implements Action {
  readonly type = ActionTypes.LOAD_ALL_ROOMS_BY_PAGE_FAIL
  constructor(public payload: any) { }
}

export class deleteRoom implements Action {
  readonly type = ActionTypes.DELETE_ROOM
  constructor(public id: string) { }
}


export type ActionsMessage =
| loadAllRoomsByPage
| loadAllRoomsByPageSuccess
| loadAllRoomsByPageFail
| deleteRoom
| updateNotification
| resetNotification
| receiveMessage
| addRoom
