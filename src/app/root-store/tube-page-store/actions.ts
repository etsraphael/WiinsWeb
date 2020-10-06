import { Action } from '@ngrx/store';
import { TubePageModel } from 'src/app/core/models/tube/tubePage.model';

export enum ActionTypes {

  LOAD_TUBE_PAGE = '@page_tube/load',
  LOAD_TUBE_PAGE_FAIL = '@page_tube/load__fail',
  LOAD_TUBE_PAGE_SUCCESS = '@page_tube/load_success',

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

export type PageTubeActions =
  | LoadPageTube
  | LoadPageTubeFail
  | LoadPageTubeSuccess
  | ResetPageTube
