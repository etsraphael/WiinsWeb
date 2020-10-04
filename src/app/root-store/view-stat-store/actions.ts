import { Action } from '@ngrx/store'

export enum ActionTypes {

  VIEW_PAGE = '@page/view',
  VIEW_PAGE_SUCCESS = '@page/view_success',
  VIEW_PAGE_FAIL = '@page/view_fail',

}

export class ViewPage implements Action {
  readonly type = ActionTypes.VIEW_PAGE
  constructor(public id: string) {}
}

export class ViewPageSuccess implements Action {
  readonly type = ActionTypes.VIEW_PAGE_SUCCESS
  constructor(public statut: number) {}
}

export class ViewPageFail implements Action {
  readonly type = ActionTypes.VIEW_PAGE_FAIL
  constructor(public statut: number) {}
}

export type ActionsViews =
| ViewPage
| ViewPageSuccess
| ViewPageFail
