import { Action } from '@ngrx/store';
import { RequestProfile } from 'src/app/core/models/request/request.model';

export enum ActionTypes {

  GET_FRIEND_REQUESTS = '@friends/get_request',
  GET_FRIEND_REQUESTS_SUCCESS = '@friends/get_request_success',
  GET_FRIEND_REQUESTS_FAIL = '@friends/get_request_fail',

  LOAD_FRIEND_REQUESTS_TO_ME = '@friends/load_request_to_me',
  LOAD_FRIEND_REQUESTS_TO_ME_SUCCESS = '@friends/load_request_to_me_success',
  LOAD_FRIEND_REQUESTS_TO_ME_FAIL = '@friends/load_request_to_me_fail',

  FRIEND_REQUEST = '@friends/request',
  FRIEND_REQUEST_ACCEPT = '@friends/accept',
  FRIEND_REQUEST_REJECT = '@friends/reject',

  REQUESTS_START = '@friends/request_start',
  FRIEND_REQUEST_SUCCESS = '@friends/success',
  FRIEND_REQUEST_FAIL = '@friends/fail',

  DELETE_REQUEST = '@friends/delete_request',
  DELETE_REQUEST_SUCCESS = '@friends/delete_success',
  DELETE_REQUEST_FAIL = '@friends/delete_reject_fail',

  CONFIRM_FRIEND_REQUEST = '@friends/confirm',
  CONFIRM_FRIEND_REQUEST_SUCCESS = '@friends/confirm_success',
  CONFIRM_FRIEND_REQUEST_FAIL = '@friends/confirm_fail',

  CONFIRM_GROUP_REQUEST = '@group/confirm',
  CONFIRM_GROUP_REQUEST_SUCCESS = '@group/confirm_success',
  CONFIRM_GROUP_REQUEST_FAIL = '@group/confirm_fail',

  REFUSE_GROUP_REQUEST = '@group/refuse',
  REFUSE_GROUP_REQUEST_SUCCESS = '@group/refuse_success',
  REFUSE_GROUP_REQUEST_FAIL = '@group/refuse_fail',
}


export class RequestStart implements Action {
  readonly type = ActionTypes.REQUESTS_START;
}

export class CreateFriendRequest implements Action {
  readonly type = ActionTypes.FRIEND_REQUEST;
  constructor(public id: string) {}
}

export class GetFriendRequests implements Action {
  readonly type = ActionTypes.GET_FRIEND_REQUESTS;
}

export class GetFriendRequestsSuccess implements Action {
  readonly type = ActionTypes.GET_FRIEND_REQUESTS_SUCCESS;
  constructor(public payload: RequestProfile[]) {}
}

export class GetFriendRequestsFail implements Action {
  readonly type = ActionTypes.GET_FRIEND_REQUESTS_FAIL;
  constructor(public payload: any) {}
}


export class LoadFriendRequestsToMe implements Action {
  readonly type = ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME;
}

export class LoadFriendRequestsToMeSuccess implements Action {
  readonly type = ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME_SUCCESS;
  constructor(public payload: RequestProfile[]) {}
}

export class LoadFriendRequestsToMeFail implements Action {
  readonly type = ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME_FAIL;
  constructor(public payload: any) {}
}

export class AcceptFriendRequest implements Action {
  readonly type = ActionTypes.FRIEND_REQUEST_ACCEPT;
  constructor(public id: string) {}
}

export class RejectFriendRequest implements Action {
  readonly type = ActionTypes.FRIEND_REQUEST_REJECT;
  constructor(public id: string) {}
}

export class FriendRequestFail implements Action {
  readonly type = ActionTypes.FRIEND_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class FriendRequestSuccess implements Action {
  readonly type = ActionTypes.FRIEND_REQUEST_SUCCESS;
  constructor(public payload: RequestProfile) {}
}

export class DeleteFriendRequest implements Action {
  readonly type = ActionTypes.DELETE_REQUEST;
  constructor(public id: string) {}
}

export class DeleteFriendRequestSuccess implements Action {
  readonly type = ActionTypes.DELETE_REQUEST_SUCCESS;
  constructor(public message: number) {}
}

export class DeleteFriendRequestFail implements Action {
  readonly type = ActionTypes.DELETE_REQUEST_FAIL;
  constructor(public message: number) {}
}

export class ConfirmFriendRequest implements Action {
  readonly type = ActionTypes.CONFIRM_FRIEND_REQUEST;
  constructor(public id: string) {}
}

export class ConfirmFriendRequestSuccess implements Action {
  readonly type = ActionTypes.CONFIRM_FRIEND_REQUEST_SUCCESS;
  constructor(public payload: RequestProfile) {}
}

export class ConfirmFriendRequestFail implements Action {
  readonly type = ActionTypes.CONFIRM_FRIEND_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class ConfirmGroupRequest implements Action {
  readonly type = ActionTypes.CONFIRM_GROUP_REQUEST
  constructor(public id: string) {}
}

export class ConfirmGroupRequestSuccess implements Action {
  readonly type = ActionTypes.CONFIRM_GROUP_REQUEST_SUCCESS
  constructor(public payload: RequestProfile) {}
}

export class ConfirmGroupRequestFail implements Action {
  readonly type = ActionTypes.CONFIRM_GROUP_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class RefuseGroupRequest implements Action {
  readonly type = ActionTypes.REFUSE_GROUP_REQUEST
  constructor(public id: string) {}
}

export class RefuseGroupRequestSuccess implements Action {
  readonly type = ActionTypes.REFUSE_GROUP_REQUEST_SUCCESS
  constructor(public payload: RequestProfile) {}
}

export class RefuseGroupRequestFail implements Action {
  readonly type = ActionTypes.REFUSE_GROUP_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export type ActionsFriendRequest =
  GetFriendRequests
| GetFriendRequestsSuccess
| GetFriendRequestsFail
| LoadFriendRequestsToMe
| LoadFriendRequestsToMeSuccess
| LoadFriendRequestsToMeFail
| CreateFriendRequest
| AcceptFriendRequest
| RejectFriendRequest
| FriendRequestFail
| FriendRequestSuccess
| RequestStart
| DeleteFriendRequest
| DeleteFriendRequestSuccess
| DeleteFriendRequestFail
| ConfirmFriendRequest
| ConfirmFriendRequestSuccess
| ConfirmFriendRequestFail
| ConfirmGroupRequest
| ConfirmGroupRequestSuccess
| ConfirmGroupRequestFail
| RefuseGroupRequest
| RefuseGroupRequestSuccess
| RefuseGroupRequestFail

