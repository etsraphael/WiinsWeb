import { Action } from '@ngrx/store';
import { CommentModel } from 'src/app/core/models/comment/comment.model';

export enum ActionTypes {

  ADD_RESPONSE = '@response/add',
  ADD_RESPONSE_SUCCESS = '@response/add_success',
  ADD_RESPONSE_FAIL = '@response/add_fail',

  LOAD_RESPONSE = '@response/load',
  LOAD_RESPONSE_SUCCESS = '@response/loadsuccess',
  LOAD_RESPONSE_FAIL = '@response/load_fail',

  LOAD_RESPONSE_PLAYLIST = '@comment_reponse_playlist/load',
  LOAD_RESPONSE_PLAYLIST_SUCCESS = '@comment_reponse_playlist/load_success',
  LOAD_RESPONSE_PLAYLIST_FAIL = '@comment_reponse_playlist/load_fail',

  RESET_RESPONSE = '@response/reset',

  UPDATE_RESPONSE_LIKE = '@update_response/like',
  UPDATE_RESPONSE_DISLIKE = '@update_response/dislike',

}

export class UpdateLike implements Action {
  readonly type = ActionTypes.UPDATE_RESPONSE_LIKE
  constructor(public id: string) { }
}

export class UpdateDislike implements Action {
  readonly type = ActionTypes.UPDATE_RESPONSE_DISLIKE
  constructor(public id: string) { }
}

export class ResetResponse implements Action {
  readonly type = ActionTypes.RESET_RESPONSE
}

export class AddResponse implements Action {
  readonly type = ActionTypes.ADD_RESPONSE;
  constructor(public payload: CommentModel) { }
}

export class AddResponseSuccess implements Action {
  readonly type = ActionTypes.ADD_RESPONSE_SUCCESS;
  constructor(public payload: CommentModel) { }
}

export class AddResponseFail implements Action {
  readonly type = ActionTypes.ADD_RESPONSE_FAIL;
  constructor(public payload: any) { }
}

export class LoadResponseById implements Action {
  readonly type = ActionTypes.LOAD_RESPONSE;
  constructor( public page: string , public id: string) { }
}

export class LoadResponseByIdFail implements Action {
  readonly type = ActionTypes.LOAD_RESPONSE_FAIL;
  constructor(public payload: any) { }
}

export class LoadResponseByIdSuccess implements Action {
  readonly type = ActionTypes.LOAD_RESPONSE_SUCCESS;
  constructor(public payload: CommentModel[]) { }
}

export class LoadResponsePlaylist implements Action {
  readonly type = ActionTypes.LOAD_RESPONSE_PLAYLIST;
  constructor(public page: string, public id: string) { }
}

export class LoadResponsePlaylistFail implements Action {
  readonly type = ActionTypes.LOAD_RESPONSE_PLAYLIST_FAIL;
  constructor(public payload: any) { }
}

export class LoadResponsePlaylistSuccess implements Action {
  readonly type = ActionTypes.LOAD_RESPONSE_PLAYLIST_SUCCESS;
  constructor(public payload: CommentModel[]) { }
}

export type ActionsResponse =
  | AddResponse
  | AddResponseSuccess
  | AddResponseFail
  | LoadResponseById
  | LoadResponseByIdSuccess
  | LoadResponseByIdFail
  | LoadResponsePlaylist
  | LoadResponsePlaylistSuccess
  | LoadResponsePlaylistFail
  | ResetResponse
  | UpdateLike
  | UpdateDislike
