import { Action } from '@ngrx/store';
import { TubeMenuModel } from 'src/app/core/models/tube/tubeMenu.model';

export enum ActionTypes {

  LOAD_MENU = '@menu/load',
  LOAD_MENU_FAIL = '@menu/load__fail',
  LOAD_MENU_SUCCESS = '@menu/load_success',

}

export class LoadMenuFeed implements Action {
  readonly type = ActionTypes.LOAD_MENU
}

export class LoadMenuFeedFail implements Action {
  readonly type = ActionTypes.LOAD_MENU_FAIL
  constructor(public payload: string) { }
}

export class LoadMenuFeedSuccess implements Action {
  readonly type = ActionTypes.LOAD_MENU_SUCCESS
  constructor(public payload: TubeMenuModel) { }
}

export type ActionsFeedPublication =
  | LoadMenuFeed
  | LoadMenuFeedFail
  | LoadMenuFeedSuccess
