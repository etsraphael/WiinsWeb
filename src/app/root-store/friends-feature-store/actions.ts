import { Action } from '@ngrx/store';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export enum ActionTypes {
  GET_PROFILE_FRIENDS = '@profile/get_friends',
  GET_PROFILE_FRIENDS_START = '@profile/get_friends_start',
  GET_PROFILE_FRIENDS_SUCCESS = '@profile/get_friends_success',
  GET_PROFILE_FRIENDS_FAIL = '@profile/get_friends_fail'
}


export class GetProfileFriends implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS;
}

export class GetProfileFriendsStart implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS_START;
}

export class GetProfileFriendsSuccess implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS_SUCCESS;

  constructor(public payload: ProfileModel[]) {}
}

export class GetProfileFriendsFail implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS_FAIL;

  constructor(public payload: any) {}
}

export type Actions =  GetProfileFriendsFail
| GetProfileFriendsSuccess
| GetProfileFriends
| GetProfileFriendsStart;
