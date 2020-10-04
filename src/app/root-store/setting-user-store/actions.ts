import { Action } from '@ngrx/store';
import { PrivacySetting } from 'src/app/core/models/baseUser/privacySetting.model';

export enum ActionTypes {
  LOAD_SETTING_VISIBILITY = '@load/setting-visibility',
  LOAD_SETTING_VISIBILITY_START = '@load/setting-visibility_start',
  LOAD_SETTING_VISIBILITY_SUCCESS = 'load/setting-visibility_success',
  LOAD_SETTING_VISIBILITY_FAIL = '@load/setting-visibility_fail',

  CHANGE_VISIBILITY = '@change/visibility',
  CHANGE_VISIBILITY_START = '@change/visibility_start',
  CHANGE_VISIBILITY_SUCCESS = '@change/visibility_success',
  CHANGE_VISIBILITY_FAIL = '@change/visibility_fail',
}

export class LoadSettingVisibility implements Action {
  readonly type = ActionTypes.LOAD_SETTING_VISIBILITY;
}

export class LoadSettingVisibilityStart implements Action {
  readonly type = ActionTypes.LOAD_SETTING_VISIBILITY_START;
}

export class LoadSettingVisibilitySuccess implements Action {
  readonly type = ActionTypes.LOAD_SETTING_VISIBILITY_SUCCESS;
  constructor(public setting_visibility: PrivacySetting) {}
}

export class LoadSettingVisibilityFail implements Action {
  readonly type = ActionTypes.LOAD_SETTING_VISIBILITY_FAIL;
  constructor(public payload: any) {}
}

export class ChangeVisibility implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY;
  constructor(public visibility: string) {}
}

export class ChangeVisibilityStart implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY_START;
}

export class ChangeVisibilitySuccess implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY_SUCCESS;
  constructor(public setting_visibility: PrivacySetting) {}
}

export class ChangeVisibilityFail implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY_FAIL;
  constructor(public payload: any) {}
}

export type ActionsSetting =
| LoadSettingVisibility
| LoadSettingVisibilityStart
| LoadSettingVisibilitySuccess
| LoadSettingVisibilityFail
| ChangeVisibility
| ChangeVisibilityStart
| ChangeVisibilitySuccess
| ChangeVisibilityFail;

