import { Action } from '@ngrx/store';

export enum ActionTypes {

  START_LOADING = '@modal/start-loading',
  END_LOADING = '@modal/end-loading',
  SHOW_ERROR = '@modal/show-error',
  RESET_MODAL_STATE = '@modal/reset'

}

export class startLoading implements Action {
  readonly type = ActionTypes.START_LOADING
}

export class endLoading implements Action {
  readonly type = ActionTypes.END_LOADING
}

export class showError implements Action {
  readonly type = ActionTypes.SHOW_ERROR
  constructor(public error: string) { }
}

export class resetModalState implements Action {
  readonly type = ActionTypes.RESET_MODAL_STATE;
}


export type ActionsModalState =
  | startLoading
  | endLoading
  | showError
  | resetModalState

