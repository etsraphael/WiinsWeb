import { Action } from '@ngrx/store';

export enum ActionTypes {
  SEARCH_PSEUDO = '@search/pseudo',
  SEARCH_PSEUDO_SUCCESS = '@search/pseudo_success',
  SEARCH_PSEUDO_FAIL = '@search/pseudo_fail',
}

export class SearchPseudo implements Action {
  readonly type = ActionTypes.SEARCH_PSEUDO;
  constructor(public q: string) {}
}

export class SearchPseudoSuccess implements Action {
  readonly type = ActionTypes.SEARCH_PSEUDO_SUCCESS;
  constructor(public response: boolean) {}
}

export class SearchPseudoFail implements Action {
  readonly type = ActionTypes.SEARCH_PSEUDO_FAIL;
  constructor(public payload: any) {}
}

export type ActionsPseudo =
  SearchPseudo
| SearchPseudoFail
| SearchPseudoSuccess
