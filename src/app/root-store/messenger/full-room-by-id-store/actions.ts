import { Action } from '@ngrx/store';
import { Room } from 'src/app/core/models/messenger/room.model';
import { Message } from 'src/app/core/models/messenger/message.model';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export enum ActionTypes {

  CREATE_ROOM = '@full-room/create',
  CREATE_ROOM_SUCCESS = '@full-room/create_success',
  CREATE_ROOM_FAIL = '@full-room/create_fail',

  LOAD_ROOM_BY_ID = '@full-room_by_id/load',
  LOAD_ROOM_BY_ID_SUCCESS = '@full-room_by_id/load_success',
  LOAD_ROOM_BY_ID_FAIL = '@full-room_by_id/load_fail',

  LOAD_ROOM_BY_ID_PROFILE = '@full-room_by_id_profile/load',
  LOAD_ROOM_BY_ID_PROFILE_SUCCESS = '@full-room_by_id_profile/load_success',
  LOAD_ROOM_BY_ID_PROFILE_FAIL = '@full-room_by_id_profile/load_fail',

  SEND_MESSAGE = '@message/send',
  SEND_MESSAGE_SUCCESS = '@message/send_success',
  SEND_MESSAGE_FAIL = '@message/send_fail',

  LOAD_MORE_MESSAGES_BY_ID_ROOM = '@more_message_room/load',
  LOAD_MORE_MESSAGES_BY_ID_ROOM_SUCCESS = '@more_message_room/load_success',
  LOAD_MORE_MESSAGES_BY_ID_ROOM_FAIL = '@more_message_room/load_fail',

  LOAD_ROOM_BY_ID_PROFILES = '@room_by_id_profiles/load',
  LOAD_ROOM_BY_ID_PROFILES_SUCCESS = '@room_by_id_profiles/load_success',
  LOAD_ROOM_BY_ID_PROFILES_FAIL = '@room_by_id_profiles/load_fail',

  ROOM_MUTE = '@room_mute/room',
  ROOM_MUTE_SUCCESS = '@room_mute/room_success',
  ROOM_MUTE_FAIL = '@room_mute/room_fail',

  DELETE_ROOM = '@room_by_id/delete',
  DELETE_ROOM_SUCCESS = '@room_by_id/delete_success',
  DELETE_ROOM_FAIL = '@room_by_id/delete_fail',

  RECEIVE_MESSAGE = '@message/receive',
  KEEP_STATE = '@message/keep_state',
  CREATE_GROUP_ROOM_DESIGN = '@group_room_design/create',

  DELETE_MESSAGE = '@message/delete',
  DELETE_MESSAGE_SUCCESS = '@message/delete_success',
  DELETE_MESSAGE_FAIL = '@message/delete_fail'

}

export class deleteMessage implements Action {
  readonly type = ActionTypes.DELETE_MESSAGE
  constructor(public roomID: string, public messageID: string) { }
}

export class deleteMessageSuccess implements Action {
  readonly type = ActionTypes.DELETE_MESSAGE_SUCCESS
  constructor(public id: string) { }
}

export class deleteMessageFail implements Action {
  readonly type = ActionTypes.DELETE_MESSAGE_FAIL
  constructor(public payload: any) { }
}


export class createGroupRoomDesign implements Action {
  readonly type = ActionTypes.CREATE_GROUP_ROOM_DESIGN
  constructor(public payload: Room) {}
}

export class loadRoomByIdProfiles implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILES
  constructor(public profile: ProfileModel[]) { }
}

export class loadRoomByIdProfilesSuccess implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILES_SUCCESS
  constructor(public payload: Room, public message: string) { }
}

export class loadRoomByIdProfilesFail implements Action {
  readonly type = ActionTypes.LOAD_ROOM_BY_ID_PROFILES_FAIL
  constructor(public payload: any) { }
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

export class roomMute implements Action {
  readonly type = ActionTypes.ROOM_MUTE
  constructor(public id: string, public actif: number) {}
}

export class roomMuteSuccess implements Action {
  readonly type = ActionTypes.ROOM_MUTE_SUCCESS
  constructor(public id: string, public message: string) {}
}

export class roomMuteFail implements Action {
  readonly type = ActionTypes.ROOM_MUTE_FAIL
  constructor(public payload: any) {}
}

export class keepState implements Action {
  readonly type = ActionTypes.KEEP_STATE
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
  constructor(public profile: ProfileModel) {}
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

export type ActionsMessage =
| loadRoomByIdProfiles
| loadRoomByIdProfilesSuccess
| loadRoomByIdProfilesFail
| loadRoomById
| loadRoomByIdSuccess
| loadRoomByIdFail
| loadRoomByIdProfile
| loadRoomByIdProfileSuccess
| loadRoomByIdProfileFail
| sendMessage
| sendMessageSuccess
| sendMessageFail
| receiveMessage
| createRoom
| createRoomdSuccess
| createRoomFail
| moreMessage
| moreMessageSuccess
| moreMessageFail
| keepState
| roomMute
| roomMuteSuccess
| roomMuteFail
| deleteRoom
| deleteRoomSuccess
| deleteRoomFail
| createGroupRoomDesign
| deleteMessage
| deleteMessageSuccess
| deleteMessageFail
