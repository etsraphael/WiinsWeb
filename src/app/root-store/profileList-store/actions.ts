import { Action } from '@ngrx/store';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { PageModel } from 'src/app/core/models/page/page.model';

export enum ActionTypes {
  
  GET_PROFILE_LIST = '@profile_list/get',
  GET_LIKED_LIST = '@liked_list/get',
  GET_GROUP_MEMBER = '@group_member/get',

  GET_PROFILE_LIST_SUCCESS = '@profile_list/get_success',
  GET_PROFILE_LIST_FAIL = '@profile_list/get_fail',

  RESET_PROFILE_LIST = '@profile_list/reset'

}

export class ResetProfileList implements Action {
  readonly type = ActionTypes.RESET_PROFILE_LIST
}

export class GetProfileList implements Action {
  readonly type = ActionTypes.GET_PROFILE_LIST
  constructor(public mode: string, public page: number) { }
}

export class GetLikedList implements Action {
  readonly type = ActionTypes.GET_LIKED_LIST
  constructor(public id: string, public page: number) { }
}

export class GetGroupMember implements Action {
  readonly type = ActionTypes.GET_GROUP_MEMBER
  constructor(public id: string, public page: number, public total: number) {}
}

export class GetProfileListSuccess implements Action {
  readonly type = ActionTypes.GET_PROFILE_LIST_SUCCESS;
  constructor(public payload: ProfileModel[] | PageModel[]) { }
}

export class GetProfileListFail implements Action {
  readonly type = ActionTypes.GET_PROFILE_LIST_FAIL;
  constructor(public payload: any) { }
}

export type ActionsProfileList =
  | GetProfileList
  | GetProfileListSuccess
  | GetProfileListFail
  | ResetProfileList
  | GetLikedList
