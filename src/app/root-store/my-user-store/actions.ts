import { UserModel } from './../../core/models/baseUser/user.model'
import { Action } from '@ngrx/store'

export enum ActionTypes {

  LOAD_USER = '@user/load',
  LOAD_USER_SUCCESS = '@user/load_success',
  LOAD_USER_FAIL = '@user/load_fail',

  LOAD_USER_WITH_TOKEN = '@user/load_with_token',
  LOAD_USER_WITH_TOKEN_SUCCESS = '@user/load_with_token_success',
  LOAD_USER_WITH_TOKEN_FAIL = '@user/load_with_token_fail',

  UPDATE_USER = '@user/update',
  UPDATE_USER_SUCCESS = '@user/update_success',
  UPDATE_USER_FAIL = '@user/update_fail',

  CONNECT_WEB_SOCKET = '@web_socket/connect',
  CONNECT_WEB_SOCKET_SUCCESS = '@web_socket/connect_sucess',
  CONNECT_WEB_SOCKET_FAIL = '@web_socket/connect_fail',

  LOGOUT = '@user/log_out',
  KEEP_STATE = "keepState"

}

export class keepState implements Action {
  readonly type = ActionTypes.KEEP_STATE;
}

export class LoadUser implements Action {
  readonly type = ActionTypes.LOAD_USER;
  constructor(public emailOrPseudo: string, public password: string) {}
}

export class LoadUserSuccess implements Action {
  readonly type = ActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: UserModel, public token: string) {}
}

export class LoadUserFail implements Action {
  readonly type = ActionTypes.LOAD_USER_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserWithToken implements Action {
  readonly type = ActionTypes.LOAD_USER_WITH_TOKEN;
  constructor(public token: string) {}
}

export class LoadUserWithTokenSuccess implements Action {
  readonly type = ActionTypes.LOAD_USER_WITH_TOKEN_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class LoadUserWithTokenFail implements Action {
  readonly type = ActionTypes.LOAD_USER_WITH_TOKEN_FAIL;
  constructor(public payload: string) {}
}

export class UpdateUser implements Action {
  readonly type = ActionTypes.UPDATE_USER;
  constructor(public payload: UserModel | any) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = ActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class UpdateUserFail implements Action {
  readonly type = ActionTypes.UPDATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class WebSocketConnect implements Action {
  readonly type = ActionTypes.CONNECT_WEB_SOCKET
  constructor(public token: string) {}
}

export class WebSocketConnectSucess implements Action {
  readonly type = ActionTypes.CONNECT_WEB_SOCKET_SUCCESS
  constructor(public message: any) {}
}

export class WebSocketConnectFail implements Action {
  readonly type = ActionTypes.CONNECT_WEB_SOCKET_FAIL
  constructor(public error: any) {}
}

export type ActionsUser =
| LoadUser
| LoadUserSuccess
| LoadUserFail
| LoadUserWithToken
| LoadUserWithTokenSuccess
| LoadUserWithTokenFail
| UpdateUser
| UpdateUserFail
| UpdateUserSuccess
| LogOut
| WebSocketConnect
| WebSocketConnectSucess
| WebSocketConnectFail
| keepState

