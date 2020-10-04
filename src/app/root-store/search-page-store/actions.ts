import { Action } from '@ngrx/store';
import { PageModel } from 'src/app/core/models/page/page.model';

export enum ActionTypes {
  SEARCH_PAGE = '@search/page',
  SEARCH_PAGE_START = '@search/page_start',
  SEARCH_PAGE_SUCCESS = '@search/page_success',
  SEARCH_PAGE_FAIL = '@search/page_fail'
}

export class SearchPage implements Action {
  readonly type = ActionTypes.SEARCH_PAGE;
  constructor(public q: string, public limit: string = '7', public page: string = '1') {}
}

export class SearchPageStart implements Action {
  readonly type = ActionTypes.SEARCH_PAGE_START;
}

export class SearchPageSuccess implements Action {
  readonly type = ActionTypes.SEARCH_PAGE_SUCCESS;
  constructor(public payload: {results: PageModel[], nextPage: number, prevPage: number, currentPage: number}) {}
}

export class SearchPageFail implements Action {
  readonly type = ActionTypes.SEARCH_PAGE_FAIL;
  constructor(public payload: any) {}
}

export type Actions =
  SearchPage
| SearchPageFail
| SearchPageStart
| SearchPageSuccess;
