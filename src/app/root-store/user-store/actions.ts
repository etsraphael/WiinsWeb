import { UserModel } from '../../core/models/baseUser/user.model';
import { Action } from '@ngrx/store';
import { UserExtend } from 'src/app/core/models/baseUser/userExtend.model';

export enum ActionTypes {

  ADD_USER = '@user/add',
  ADD_USER_SUCCESS = '@user/add_success',
  ADD_USER_FAIL = '@user/add_fail',

}

export class AddUser implements Action {
  readonly type = ActionTypes.ADD_USER;
  constructor(public payload: UserModel, public payloadDetail: UserExtend) {}
}

export class AddUserSuccess implements Action {
  readonly type = ActionTypes.ADD_USER_SUCCESS;
  constructor(public payload: UserModel) {}
}

export class AddUserFail implements Action {
  readonly type = ActionTypes.ADD_USER_FAIL;
  constructor(public payload: any) {}
}

export type ActionsUser =
| AddUser
| AddUserSuccess
| AddUserFail