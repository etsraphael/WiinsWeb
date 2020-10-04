import { Action } from '@ngrx/store';
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';


export enum ActionTypes {

  LOAD_FEED_PUBLICATION_BY_ID = '@feed-publication/load_by_id',
  LOAD_FEED_PUBLICATION_BY_ID_FAIL = '@feed-publication/load_by_id_fail',
  LOAD_FEED_PUBLICATION_BY_ID_SUCCESS = '@feed-publication/load_by_id_success',

  RESET_FEED_PUBLICATION_BY_ID = '@feed-publication/reset_by_id',
}

export class LoadFeedPublicationById implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION_BY_ID
  constructor(public id: string) { }
}

export class LoadFeedPublicationByIdSuccess implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION_BY_ID_SUCCESS
  constructor(public payload:FeedPublication) { }
}

export class LoadFeedPublicationByIdFail implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION_BY_ID_FAIL
  constructor(public payload: any) { }
}

export class ResetPublicationById implements Action {
  readonly type = ActionTypes.RESET_FEED_PUBLICATION_BY_ID
}


export type ActionsFeedPublication =
  | LoadFeedPublicationById
  | LoadFeedPublicationByIdSuccess
  | LoadFeedPublicationByIdFail
  | ResetPublicationById

