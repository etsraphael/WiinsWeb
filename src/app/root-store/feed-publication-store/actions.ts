import { Action } from '@ngrx/store';
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';

export enum ActionTypes {
  
  ADD_FEED_PUBLICATION = '@feed_publication/add',
  ADD_FEED_PUBLICATION_SUCCESS = '@feed_publication/add_success',
  ADD_FEED_PUBLICATION_FAIL = '@feed_publication/add_fail',

  REMOVE_FEED_PUBLICATION = '@feed_publication/remove',
  REMOVE_FEED_PUBLICATION_SUCCESS = '@feed_publication/remove_success',
  REMOVE_FEED_PUBLICATION_FAIL = '@feed_publication/remove_fail',

  LOAD_FEED_PUBLICATION = '@feed_publication/load',
  LOAD_FEED_PUBLICATION_GROUP_ID = '@feed_publication_group_id/load',
  LOAD_FEED_PUBLICATION_FAIL = '@feed_publication/load__fail',
  LOAD_FEED_PUBLICATION_SUCCESS = '@feed_publication/load_success',

  LOAD_SUGGEST_HASTAG = '@suggest_hastag/load',
  LOAD_SUGGEST_HASTAG_FAIL = '@suggest_hastag/fail',
  LOAD_SUGGEST_HASTAG_SUCCESS = '@suggest_hastag/success',

  UPDATE_FEED_PUBLICATION_LIKE = '@update_feed/like',
  UPDATE_FEED_PUBLICATION_DISLIKE = '@update_feed/dislike',
  RESET_FEED_PUBLICATION = '@feed_publication/reset',
  RESET_FEED_PUBLICATION_HASTAG = '@feed_publication_hastag/reset'

}

export class ResetFeed implements Action {
  readonly type = ActionTypes.RESET_FEED_PUBLICATION
}

export class ResetFeedHastag implements Action {
  readonly type = ActionTypes.RESET_FEED_PUBLICATION_HASTAG
}

export class AddFeedPublication implements Action {
  readonly type = ActionTypes.ADD_FEED_PUBLICATION
  constructor(public payload:FeedPublication) { }
}

export class AddFeedPublicationSuccess implements Action {
  readonly type = ActionTypes.ADD_FEED_PUBLICATION_SUCCESS;
  constructor(public payload:FeedPublication) { }
}

export class AddFeedPublicationFail implements Action {
  readonly type = ActionTypes.ADD_FEED_PUBLICATION_FAIL;
  constructor(public payload: any) { }
}

export class RemoveFeedPublication implements Action {
  readonly type = ActionTypes.REMOVE_FEED_PUBLICATION;
  constructor(public id: string) { }
}

export class RemoveFeedPublicationSuccess implements Action {
  readonly type = ActionTypes.REMOVE_FEED_PUBLICATION_SUCCESS;
  constructor(public payload:FeedPublication) { }
}

export class RemoveFeedPublicationFail implements Action {
  readonly type = ActionTypes.REMOVE_FEED_PUBLICATION_FAIL;
  constructor(public payload: any) { }
}

export class LoadFeedPublication implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION
  constructor(public page: string, public link: string) { }
}

export class LoadFeedPublicationFail implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION_FAIL
  constructor(public payload: any) { }
}

export class LoadFeedPublicationSuccess implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION_SUCCESS
  constructor(public payload: FeedPublication[]) { }
}

export class UpdateLike implements Action {
  readonly type = ActionTypes.UPDATE_FEED_PUBLICATION_LIKE;
  constructor(public id: string) { }
}

export class UpdateDisLike implements Action {
  readonly type = ActionTypes.UPDATE_FEED_PUBLICATION_DISLIKE;
  constructor(public id: string) { }
}

export class LoadSuggestHastag implements Action {
  readonly type = ActionTypes.LOAD_SUGGEST_HASTAG
}

export class LoadSuggestHastagFail implements Action {
  readonly type = ActionTypes.LOAD_SUGGEST_HASTAG_FAIL
  constructor(public payload: any) { }
}

export class LoadSuggestHastagSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUGGEST_HASTAG_SUCCESS
  constructor(public payload: string[]) { }
}

export class LoadFeedPublicationByGroupID implements Action {
  readonly type = ActionTypes.LOAD_FEED_PUBLICATION_GROUP_ID
  constructor(public page: string, public groups: string[]) { }
}

export type ActionsFeedPublication =
  | AddFeedPublication
  | AddFeedPublicationSuccess
  | AddFeedPublicationFail
  | LoadFeedPublication
  | LoadFeedPublicationFail
  | LoadFeedPublicationSuccess
  | RemoveFeedPublication
  | RemoveFeedPublicationSuccess
  | RemoveFeedPublicationFail
  | UpdateLike
  | UpdateDisLike
  | ResetFeed
  | ResetFeedHastag
  | LoadSuggestHastag
  | LoadSuggestHastagSuccess
  | LoadSuggestHastagFail
  | LoadFeedPublicationByGroupID

