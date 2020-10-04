import { Action } from '@ngrx/store';
import { TeamUpdate } from 'src/app/core/models/confirmation/teamUpdate';
import { AdminPage } from 'src/app/core/models/page/admin.model';

export enum ActionTypes {

  LOAD_ADMINS = '@load_admins/load',
  LOAD_ADMINS_SUCCESS = '@load_admins/load_success',
  LOAD_ADMINS_FAIL = '@load_admins/load_fail',

  CHANGE_ROLE = '@admin/update',
  CHANGE_ROLE_SUCCESS = '@admin/update_success',
  CHANGE_ROLE_FAIL = '@admin/update_fail',
}

export class LoadAdmins implements Action {
  readonly type = ActionTypes.LOAD_ADMINS;
  constructor(public pageId: string) { }
}

export class LoadAdminsSuccess implements Action {
  readonly type = ActionTypes.LOAD_ADMINS_SUCCESS;
  constructor(public payload: AdminPage) { }
}

export class LoadAdminsFail implements Action {
  readonly type = ActionTypes.LOAD_ADMINS_FAIL;
  constructor(public payload: any) { }
}

export class ChangeRole implements Action {
  readonly type = ActionTypes.CHANGE_ROLE;
  constructor(public update: TeamUpdate, public password: string) { }
}

export class ChangeRoleSuccess implements Action {
  readonly type = ActionTypes.CHANGE_ROLE_SUCCESS;
  constructor(public payload: AdminPage) { }
}

export class ChangeRoleFail implements Action {
  readonly type = ActionTypes.CHANGE_ROLE_FAIL;
  constructor(public payload: any) { }
}

export type ActionsPage =
| LoadAdmins
| LoadAdminsSuccess
| LoadAdminsFail
| ChangeRole
| ChangeRoleSuccess
| ChangeRoleFail;

