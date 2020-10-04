import { Action } from '@ngrx/store';

export enum ActionTypes {

  CHANGE_PASSWORD = '@password/change',
  CHANGE_PASSWORD_START = '@password/change_start',
  CHANGE_PASSWORD_SUCCESS = '@password/change_success',
  CHANGE_PASSWORD_FAIL = '@password/change_fail',

}

export class ChangePassword implements Action {
  readonly type = ActionTypes.CHANGE_PASSWORD;
  constructor(public payload: UpdatePasswordPayload) {}
}

export class ChangePasswordStart implements Action {
  readonly type = ActionTypes.CHANGE_PASSWORD_START;
}

export class ChangePasswordSuccess implements Action {
  readonly type = ActionTypes.CHANGE_PASSWORD_SUCCESS;
  constructor(public message: string) {}
}

export class ChangePasswordFail implements Action {
  readonly type = ActionTypes.CHANGE_PASSWORD_FAIL;
  constructor(public payload: any) {}
}

export type ActionsPassword =
| ChangePassword
| ChangePasswordStart
| ChangePasswordSuccess
| ChangePasswordFail;

