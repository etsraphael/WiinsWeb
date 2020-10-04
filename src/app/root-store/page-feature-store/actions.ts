import { PageModel } from 'src/app/core/models/page/page.model';
import { Action } from '@ngrx/store';

export enum ActionTypes {

  RESET_PAGE = '@page/reset',

  LOAD_PAGE = '@load_page/load',
  LOAD_PAGE_SUCCESS = '@load_page/load_success',
  LOAD_PAGE_FAIL = '@load_page/load_fail',

  CREAT_PAGE = '@creat_page/creat',
  CREAT_PAGE_SUCCESS = '@creat_page/creat_success',
  CREAT_PAGE_FAIL = '@creat_page/creat_fail',

  CHANGE_VISIBILITY = '@message_setting/send',
  CHANGE_VISIBILITY_SUCCESS = '@message_setting/send_success',
  CHANGE_VISIBILITY_FAIL = '@message_setting/send_fail',

  DELETE_PAGE = '@page/delete',
  DELETE_PAGE_SUCCESS = '@page/deletesuccess',
  DELETE_PAGE_FAIL = '@page/delete_fail',

  FOLLOW_PAGE = '@follow_page/follow',
  FOLLOW_PAGE_SUCCESS = '@follow_page/follow_success',
  FOLLOW_PAGE_FAIL = '@follow_page/follow_fail',

  UNFOLLOW_PAGE = '@unfollow_page/unfollow',
  UNFOLLOW_PAGE_SUCCESS = '@unfollow_page/unfollow_success',
  UNFOLLOW_PAGE_FAIL = '@unfollow_page/unfollow_fail',

}

export class ResetPage implements Action {
  readonly type = ActionTypes.RESET_PAGE
}

export class LoadPage implements Action {
  readonly type = ActionTypes.LOAD_PAGE;
  constructor(public name: string) {}
}

export class LoadPageSuccess implements Action {
  readonly type = ActionTypes.LOAD_PAGE_SUCCESS;
  constructor(public payload: PageModel) {}
}

export class LoadPageFail implements Action {
  readonly type = ActionTypes.LOAD_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class CreatPage implements Action {
  readonly type = ActionTypes.CREAT_PAGE;
  constructor(public page: PageModel) {}
}

export class CreatPageSuccess implements Action {
  readonly type = ActionTypes.CREAT_PAGE_SUCCESS;
  constructor(public payload: PageModel) {}
}

export class CreatPageFail implements Action {
  readonly type = ActionTypes.CREAT_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class ChangeVisibility implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY;
  constructor(public password: string, public pageId: string, public categorie: string) {}
}

export class ChangeVisibilitySuccess implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY_SUCCESS;
  constructor(public payload: PageModel, public message: string) {}
}

export class ChangeVisibilityFail implements Action {
  readonly type = ActionTypes.CHANGE_VISIBILITY_FAIL;
  constructor(public payload: any) {}
}

export class DeletePage implements Action {
  readonly type = ActionTypes.DELETE_PAGE;
  constructor(public password: string, public pageId: string) {}
}

export class DeletePageSuccess implements Action {
  readonly type = ActionTypes.DELETE_PAGE_SUCCESS;
  constructor(public message: string) {}
}

export class DeletePageFail implements Action {
  readonly type = ActionTypes.DELETE_PAGE_FAIL;
  constructor(public payload: any) {}
}


export class FollowPage implements Action {
  readonly type = ActionTypes.FOLLOW_PAGE;
  constructor(public id: string) {}
}

export class FollowPageSuccess implements Action {
  readonly type = ActionTypes.FOLLOW_PAGE_SUCCESS;
  constructor(public statut: number) {}
}

export class FollowPageFail implements Action {
  readonly type = ActionTypes.FOLLOW_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class UnFollowPage implements Action {
  readonly type = ActionTypes.UNFOLLOW_PAGE;
  constructor(public id: string) {}
}

export class UnFollowPageSuccess implements Action {
  readonly type = ActionTypes.UNFOLLOW_PAGE_SUCCESS;
  constructor(public statut: number) {}
}

export class UnFollowPageFail implements Action {
  readonly type = ActionTypes.UNFOLLOW_PAGE_FAIL;
  constructor(public payload: any) {}
}

export type ActionsPage =
| LoadPage
| LoadPageSuccess
| LoadPageFail
| CreatPage
| CreatPageSuccess
| CreatPageFail
| ChangeVisibility
| ChangeVisibilitySuccess
| ChangeVisibilityFail
| DeletePage
| DeletePageSuccess
| DeletePageFail
| FollowPage
| FollowPageSuccess
| FollowPageFail
| UnFollowPage
| UnFollowPageSuccess
| UnFollowPageFail
| ResetPage
