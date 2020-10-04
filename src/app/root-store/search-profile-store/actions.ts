import { Action } from '@ngrx/store';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { MemberGroupModel } from 'src/app/core/models/group/member-group.model';

export enum ActionTypes {

  SEARCH_PROFILE = '@search/profile',
  SEARCH_PROFILE_SUCCESS = '@search/profile_success',
  SEARCH_PROFILE_FAIL = '@search/profile_fail',

  SEARCH_FRIENDS = '@search/friends',
  SEARCH_FRIENDS_SUCCESS = '@search/friends_success',
  SEARCH_FRIENDS_FAIL = '@search/friends_fail',

  RESET_SEARCH = '@search/reset',
}

export class ResetSearch implements Action {
  readonly type = ActionTypes.RESET_SEARCH
}

export class SearchProfile implements Action {
  readonly type = ActionTypes.SEARCH_PROFILE;
  constructor(public q: string, public spot: string, public limit: string = '7', public page: string = '1') {}
}

export class SearchProfileSuccess implements Action {
  readonly type = ActionTypes.SEARCH_PROFILE_SUCCESS;
  constructor(public payload: {results: ProfileModel[], nextPage: number, prevPage: number, currentPage: number}) {}
}

export class SearchProfileFail implements Action {
  readonly type = ActionTypes.SEARCH_PROFILE_FAIL;
  constructor(public payload: any) {}
}

export class SearchFriends implements Action {
  readonly type = ActionTypes.SEARCH_FRIENDS
  constructor(public q: string, public spot: string, public limit: string = '7', public page: string = '1') {}
}

export class SearchFriendsSuccess implements Action {
  readonly type = ActionTypes.SEARCH_FRIENDS_SUCCESS
  constructor(public payload: {results: ProfileModel[], nextPage: number, prevPage: number, currentPage: number}) {}
}

export class SearchFriendsFail implements Action {
  readonly type = ActionTypes.SEARCH_FRIENDS_FAIL
  constructor(public payload: any) {}
}

export type Actions =
| SearchProfile
| SearchProfileFail
| SearchProfileSuccess
| SearchFriends
| SearchFriendsFail
| SearchFriendsSuccess
| ResetSearch






