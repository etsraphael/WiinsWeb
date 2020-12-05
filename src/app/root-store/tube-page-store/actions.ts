import { Action } from '@ngrx/store';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { TubePageModel } from 'src/app/core/models/tube/tubePage.model';

export enum ActionTypes {

  LOAD_TUBE_PAGE = '@page_tube/load',
  LOAD_TUBE_PAGE_FAIL = '@page_tube/load__fail',
  LOAD_TUBE_PAGE_SUCCESS = '@page_tube/load_success',

  DELETE_FRIEND = '@page_tube/delete',
  DELETE_FRIEND_SUCCESS = '@page_tube/delete_success',
  DELETE_FRIEND_FAIL = '@page_tube/delete_fail',

  FOLLOW_PROFILE = '@page_tube/follow',
  FOLLOW_PROFILE_SUCCESS = '@page_tube/follow_success',
  FOLLOW_PROFILE_FAIL = '@page_tube/follow_fail',

  UNFOLLOW_PROFILE = '@page_tube/unfollow',
  UNFOLLOW_PROFILE_SUCCESS = '@page_tube/unfollow_success',
  UNFOLLOW_PROFILE_FAIL = '@page_tube/unfollow_fail',

  RESET_TUBE_PAGE = '@page_tube/reset'

}

export class LoadPageTube implements Action {
  readonly type = ActionTypes.LOAD_TUBE_PAGE
  constructor(public id: string) { }
}

export class LoadPageTubeFail implements Action {
  readonly type = ActionTypes.LOAD_TUBE_PAGE_FAIL
  constructor(public payload: string) { }
}

export class LoadPageTubeSuccess implements Action {
  readonly type = ActionTypes.LOAD_TUBE_PAGE_SUCCESS
  constructor(public payload: TubePageModel) { }
}

export class ResetPageTube implements Action {
  readonly type = ActionTypes.RESET_TUBE_PAGE
}

export class DeleteFriend implements Action {
  readonly type = ActionTypes.DELETE_FRIEND;
  constructor(public id: string) { }
}

export class DeleteFriendSuccess implements Action {
  readonly type = ActionTypes.DELETE_FRIEND_SUCCESS;
  constructor(public payload: ProfileModel) { }
}

export class DeleteFriendFail implements Action {
  readonly type = ActionTypes.DELETE_FRIEND_FAIL;
  constructor(public payload: any) { }
}

export class FollowProfile implements Action {
  readonly type = ActionTypes.FOLLOW_PROFILE
  constructor(public id: string) { }
}

export class FollowProfileSuccess implements Action {
  readonly type = ActionTypes.FOLLOW_PROFILE_SUCCESS
  constructor(public message: string) { }
}

export class FollowProfileFail implements Action {
  readonly type = ActionTypes.FOLLOW_PROFILE_FAIL
  constructor(public payload: string) { }
}

export class UnFollowProfile implements Action {
  readonly type = ActionTypes.UNFOLLOW_PROFILE
  constructor(public id: string) { }
}

export class UnFollowProfileSuccess implements Action {
  readonly type = ActionTypes.UNFOLLOW_PROFILE_SUCCESS
  constructor(public message: string) { }
}

export class UnFollowProfileFail implements Action {
  readonly type = ActionTypes.UNFOLLOW_PROFILE_FAIL
  constructor(public payload: string) { }
}

export type PageTubeActions =
  | LoadPageTube
  | LoadPageTubeFail
  | LoadPageTubeSuccess
  | FollowProfile
  | FollowProfileSuccess
  | FollowProfileFail
  | UnFollowProfile
  | UnFollowProfileSuccess
  | UnFollowProfileFail
  | DeleteFriend
  | DeleteFriendSuccess
  | DeleteFriendFail
  | ResetPageTube