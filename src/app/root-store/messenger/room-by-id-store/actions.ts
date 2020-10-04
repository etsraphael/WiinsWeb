import { Action } from '@ngrx/store';
import { Room } from 'src/app/core/models/messenger/room.model';
import { Message } from 'src/app/core/models/messenger/message.model';

export enum ActionTypes {

  CREATE_ROOM = '@current-room/create',
  CREATE_ROOM_SUCCESS = '@current-room/create_success',
  CREATE_ROOM_FAIL = '@current-room/create_fail',

  LOAD_ROOM_BY_ID = '@current-room_by_id/load',
  LOAD_ROOM_BY_ID_SUCCESS = '@current-room_by_id/load_success',
  LOAD_ROOM_BY_ID_FAIL = '@current-room_by_id/load_fail',

  LOAD_ROOM_BY_ID_PROFILE = '@current-room_by_id_profile/load',
  LOAD_ROOM_BY_ID_PROFILE_SUCCESS = '@current-room_by_id_profile/load_success',
  LOAD_ROOM_BY_ID_PROFILE_FAIL = '@current-room_by_id_profile/load_fail',

  LOAD_ROOM_BY_ID_PROFILES = '@current-room_by_id_profiles/load',
  LOAD_ROOM_BY_ID_PROFILES_SUCCESS = '@current-room_by_id_profiles/load_success',
  LOAD_ROOM_BY_ID_PROFILES_FAIL = '@current-room_by_id_profiles/load_fail',

  DELETE_ROOM = '@current_room_by_id/delete',
  DELETE_ROOM_SUCCESS = '@current_room_by_id/delete_success',
  DELETE_ROOM_FAIL = '@current_room_by_id/delete_fail',

  SEND_MESSAGE = '@current-message/send',
  SEND_MESSAGE_SUCCESS = '@current-message/send_success',
  SEND_MESSAGE_FAIL = '@current-message/send_fail',

  CURRENT_ROOM_MUTE = '@current_room_mute/room',
  CURRENT_ROOM_MUTE_SUCCESS = '@current_room_mute/room_success',
  CURRENT_ROOM_MUTE_FAIL = '@current_room_mute/room_fail',

  LOAD_MORE_MESSAGES_BY_ID_ROOM = '@more_message_current_room/load',
  LOAD_MORE_MESSAGES_BY_ID_ROOM_SUCCESS = '@more_message_current_room/load_success',
  LOAD_MORE_MESSAGES_BY_ID_ROOM_FAIL = '@more_message_current_room/load_fail',

  CREATE_GROUP_ROOM_DESIGN = '@current-group_room_design/create',
  RECEIVE_MESSAGE = '@current-message/receive',
  RESET_ROOM = '@current-room_by_id/reset',
}

export class createGroupRoomDesign implements Action {
  readonly type = ActionTypes.CREATE_GROUP_ROOM_DESIGN
  constructor(public payload: Room) {}
}

export class moreMessage implements Action {
  readonly type = ActionTypes.LOAD_MORE_MESSAGES_BY_ID_ROOM
  constructor(public id: string, public page: number, public nbMessage: number) {}
}

export class moreMessageSuccess implements Action {
  readonly type = ActionTypes.LOAD_MORE_MESSAGES_BY_ID_ROOM_SUCCESS
  constructor(public payload: Message[]) {}
}

export class moreMessageFail implements Action {
  readonly type = ActionTypes.LOAD_MORE_MESSAGES_BY_ID_ROOM_FAIL
  constructor(public payload: any) {}
}

export class currentRoomMute implements Action {
  readonly type = ActionTypes.CURRENT_ROOM_MUTE
  constructor(public id: string, public actif: number) {}
}

export class currentRoomMuteSuccess implements Action {
  readonly type = ActionTypes.CURRENT_ROOM_MUTE_SUCCESS
  constructor(public id: string, public message: string) {}
}

export class currentRoomMuteFail implements Action {
  readonly type = ActionTypes.CURRENT_ROOM_MUTE_FAIL
  constructor(public payload: any) {}
}

export class createRoom implements Action {
  readonly type = ActionTypes.CREATE_ROOM
  constructor(public payload: Room) {}
}

export class createRoomdSuccess implements Action {
  readonly type = ActionTypes.CREATE_ROOM_SUCCESS
  constructor(public payload: Room) {}
}

export class createRoomFail implements Action {
  readonly type = ActionTypes.CREATE_ROOM_FAIL
  constructor(public payload: any) {}
}

export class resetRoom implements Action {
  readonly type = ActionTypes.RESET_ROOM
}

export class loadRoomById implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID
  constructor(public id: string, public page: number, public nbMessage: number) {}
}

export class loadRoomByIdSuccess implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_SUCCESS
  constructor(public payload: Room) {}
}

export class loadRoomByIdFail implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_FAIL
  constructor(public payload: any) {}
}

export class loadRoomByIdProfile implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILE
  constructor(public id: string) {}
}

export class loadRoomByIdProfileSuccess implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILE_SUCCESS
  constructor(public payload: Room) {}
}

export class loadRoomByIdProfileFail implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILE_FAIL
  constructor(public payload: any) {}
}

export class sendMessage implements Action {
  readonly type = ActionTypes.SEND_MESSAGE;
  constructor(public payload: Message, public idRoom: string) {}
}

export class sendMessageSuccess implements Action {
  readonly type = ActionTypes.SEND_MESSAGE_SUCCESS;
  constructor(public payload: Message) {}
}

export class sendMessageFail implements Action {
  readonly type = ActionTypes.SEND_MESSAGE_FAIL;
  constructor(public payload: any) {}
}

export class receiveMessage implements Action {
  readonly type = ActionTypes.RECEIVE_MESSAGE
  constructor(public payload: any) {}
}

export class deleteRoom implements Action {
  readonly type = ActionTypes.DELETE_ROOM
  constructor(public id: string) { }
}

export class deleteRoomSuccess implements Action {
  readonly type = ActionTypes.DELETE_ROOM_SUCCESS
  constructor(public id: string) { }
}

export class deleteRoomFail implements Action {
  readonly type = ActionTypes.DELETE_ROOM_FAIL
  constructor(public payload: any) { }
}

export class loadRoomByIdProfiles implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILES
  constructor(public id: string[]) { }
}

export class loadRoomByIdProfilesSuccess implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILES_SUCCESS
  constructor(public payload: Room, public message: string) { }
}

export class loadRoomByIdProfilesFail implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILES_FAIL
  constructor(public payload: any) { }
}

export type ActionsMessage =
| loadRoomById
| loadRoomByIdSuccess
| loadRoomByIdFail
| loadRoomByIdProfile
| loadRoomByIdProfileSuccess
| loadRoomByIdProfileFail
| loadRoomByIdProfiles
| loadRoomByIdProfilesSuccess
| loadRoomByIdProfilesFail
| sendMessage
| sendMessageSuccess
| sendMessageFail
| receiveMessage
| resetRoom
| createRoom
| createRoomdSuccess
| createRoomFail
| deleteRoom
| deleteRoomSuccess
| deleteRoomFail
| currentRoomMute
| currentRoomMuteSuccess
| currentRoomMuteFail
| moreMessage
| moreMessageSuccess
| moreMessageFail
| createGroupRoomDesign

