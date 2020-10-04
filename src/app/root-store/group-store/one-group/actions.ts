import { Action } from '@ngrx/store'
import { GroupModel } from 'src/app/core/models/group/group.model'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { MemberGroupModel } from 'src/app/core/models/group/member-group.model';
import { TeamUpdate } from 'src/app/core/models/confirmation/teamUpdate';
import { AdminGroup } from 'src/app/core/models/page/admin.model';

export enum ActionTypes {

  LOAD_GROUP = '@one_group/load',
  LOAD_GROUP_SUCCESS = '@one_group/load_success',
  LOAD_GROUP_FAIL = '@one_group/load_fail',

  UPDATE_GROUP = '@one_group/update',
  UPDATE_GROUP_SUCCESS = '@one_group/update_success',
  UPDATE_GROUP_FAIL = '@one_group/update_fail',

  LOAD_MEMBER = '@one_group_member/load',
  LOAD_MEMBER_SUCCESS = '@one_group_member/load_success',
  LOAD_MEMBER_FAIL = '@one_group_member/load_fail',

  CHANGE_ROLE = '@admin_group/update',
  CHANGE_ROLE_SUCCESS = '@admin_group/update_success',
  CHANGE_ROLE_FAIL = '@admin_group/update_fail',
  ADD_ADMIN_SUCCESS = '@admin_group_add/success',
  LEAVE_GROUP_SUCCESS = '@admin_group_leave/success', 

  SEND_REQUEST_MEMBER = '@request_group_member/load',
  SEND_REQUEST_MEMBER_SUCCESS = '@request_group_member/load_success',
  SEND_REQUEST_MEMBER_FAIL = '@request_group_member/load_fail',

  DELETE_MEMBER = '@member_group/delete',
  DELETE_MEMBER_SUCCESS = '@member_group/delete_success',
  DELETE_MEMBER_FAIL = '@member_group/delete_fail',

  RESET_MEMBER = '@reset_group_member',

}

export class leaveGroupSuccess implements Action {
  readonly type = ActionTypes.LEAVE_GROUP_SUCCESS
}

export class ChangeRole implements Action {
  readonly type = ActionTypes.CHANGE_ROLE;
  constructor(public update: TeamUpdate, public password: string) { }
}

export class AddAdminSuccess implements Action {
  readonly type = ActionTypes.ADD_ADMIN_SUCCESS
  constructor(public payload: ProfileModel) { }
}

export class ChangeRoleSuccess implements Action {
  readonly type = ActionTypes.CHANGE_ROLE_SUCCESS;
  constructor(public payload: AdminGroup) { }
}

export class ChangeRoleFail implements Action {
  readonly type = ActionTypes.CHANGE_ROLE_FAIL;
  constructor(public payload: any) { }
}

export class deleteMember implements Action {
  readonly type = ActionTypes.DELETE_MEMBER
  constructor(public groupID: string, public profileID: string) {}
}

export class deleteMemberSuccess implements Action {
  readonly type = ActionTypes.DELETE_MEMBER_SUCCESS
  constructor(public payload: ProfileModel) {}
}

export class deleteMemberFail implements Action {
  readonly type = ActionTypes.DELETE_MEMBER_FAIL;
  constructor(public payload: string) {}
}

export class resetMember implements Action {
  readonly type = ActionTypes.RESET_MEMBER
}

export class SendRequestMember implements Action {
  readonly type = ActionTypes.SEND_REQUEST_MEMBER
  constructor(public teamID: string, public profileID: string) {}
}

export class SendRequestMemberSuccess implements Action {
  readonly type = ActionTypes.SEND_REQUEST_MEMBER_SUCCESS
  constructor(public payload: ProfileModel) {}
}

export class SendRequestMemberFail implements Action {
  readonly type = ActionTypes.SEND_REQUEST_MEMBER_FAIL;
  constructor(public payload: string) {}
}

export class LoadMember implements Action {
  readonly type = ActionTypes.LOAD_MEMBER
  constructor(public id: string, public page: number, public total: number) {}
}

export class LoadMemberSuccess implements Action {
  readonly type = ActionTypes.LOAD_MEMBER_SUCCESS
  constructor(public payload: MemberGroupModel[]) {}
}

export class LoadMemberFail implements Action {
  readonly type = ActionTypes.LOAD_MEMBER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateGroup implements Action {
  readonly type = ActionTypes.UPDATE_GROUP
  constructor(public payload: GroupModel) {}
}

export class UpdateGroupSuccess implements Action {
  readonly type = ActionTypes.UPDATE_GROUP_SUCCESS
  constructor(public payload: GroupModel) {}
}

export class UpdateGroupFail implements Action {
  readonly type = ActionTypes.UPDATE_GROUP_FAIL
  constructor(public payload: string) {}
}

export class LoadGroupAdmin implements Action {
  readonly type = ActionTypes.LOAD_GROUP
  constructor(public id: string) {}
}

export class LoadGroupAdminSuccess implements Action {
  readonly type = ActionTypes.LOAD_GROUP_SUCCESS
  constructor(public payload: GroupModel) {}
}

export class LoadGroupAdminFail implements Action {
  readonly type = ActionTypes.LOAD_GROUP_FAIL
  constructor(public payload: string) {}
}


export type ActionsGroup =
| LoadGroupAdmin
| LoadGroupAdminSuccess
| LoadGroupAdminFail
| UpdateGroup
| UpdateGroupSuccess
| UpdateGroupFail
| LoadMember
| LoadMemberSuccess
| LoadMemberFail
| SendRequestMember
| SendRequestMemberSuccess
| SendRequestMemberFail
| resetMember
| deleteMember
| deleteMemberSuccess
| deleteMemberFail
| ChangeRole
| ChangeRoleSuccess
| ChangeRoleFail
| AddAdminSuccess
| leaveGroupSuccess