import { Action } from '@ngrx/store'
import { GroupModel } from 'src/app/core/models/group/group.model'

export enum ActionTypes {

  CREAT_GROUP = '@group/creat',
  CREAT_GROUP_SUCCESS = '@group/creat_success',
  CREAT_GROUP_FAIL = '@group/creat_fail',

  LOAD_MY_GROUPS = '@my_groups/load',
  LOAD_MY_GROUPS_SUCCESS = '@my_groups/load_success',
  LOAD_MY_GROUPS_FAIL = '@my_groups/load_fail',

  LEAVE_GROUP = '@my_groups/leave',
  LEAVE_GROUP_SUCCESS = '@my_groups/leave_success',
  LEAVE_GROUP_FAIL = '@my_groups/leave_fail',

}

export class LeaveGroup implements Action {
  readonly type = ActionTypes.LEAVE_GROUP
  constructor(public id: string) {}
}

export class LeaveGroupSuccess implements Action {
  readonly type = ActionTypes.LEAVE_GROUP_SUCCESS
  constructor(public id: string) {}
}

export class LeaveGroupFail implements Action {
  readonly type = ActionTypes.LEAVE_GROUP_FAIL
  constructor(public payload: string) {}
}

export class LoadMyGroups implements Action {
  readonly type = ActionTypes.LOAD_MY_GROUPS
}

export class LoadMyGroupsSuccess implements Action {
  readonly type = ActionTypes.LOAD_MY_GROUPS_SUCCESS
  constructor(public payload: GroupModel[]) {}
}

export class LoadMyGroupsFail implements Action {
  readonly type = ActionTypes.LOAD_MY_GROUPS_FAIL
  constructor(public payload: string) {}
}

export class CreatGroup implements Action {
  readonly type = ActionTypes.CREAT_GROUP
  constructor(public payload: GroupModel) {}
}

export class CreatGroupSuccess implements Action {
  readonly type = ActionTypes.CREAT_GROUP_SUCCESS
  constructor(public payload: GroupModel) {}
}

export class CreatGroupFail implements Action {
  readonly type = ActionTypes.CREAT_GROUP_FAIL
  constructor(public payload: string) {}
}

export type ActionsGroup =
| CreatGroup
| CreatGroupSuccess
| CreatGroupFail
| LoadMyGroups
| LoadMyGroupsSuccess
| LoadMyGroupsFail
| LeaveGroup
| LeaveGroupSuccess
| LeaveGroupFail