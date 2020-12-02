import { Action } from '@ngrx/store';
import { CommentModel } from 'src/app/core/models/comment/comment.model';

export enum ActionTypes {
  
  ADD_COMMENT = '@comment/add',
  ADD_COMMENT_SUCCESS = '@comment/add_success',
  ADD_COMMENT_FAIL = '@comment/add_fail',

  ADD_COMMENT_WITHOUT_TREND = '@comment_without_trend/add',
  ADD_COMMENT_WITHOUT_TREND_SUCCESS = '@comment_without_trend/add_success',
  ADD_COMMENT_WITHOUT_TREND_FAIL = '@comment_without_trend/add_fail',

  PUT_COMMENT = '@comment/put',
  PUT_COMMENT_SUCCESS = '@comment/put_success',
  PUT_COMMENT_FAIL = '@comment/put_fail',

  DELETE_COMMENT = '@comment/delete',
  DELETE_COMMENT_SUCCESS = '@comment/delete_success',
  DELETE_COMMENT_FAIL = '@comment/delete_fail',

  DELETE_COMMENT_PLAYLIST_MUSIC = '@comment_playlist_music/delete',
  DELETE_COMMENT_PLAYLIST_MUSIC_SUCCESS = '@comment_playlist_music/delete_success',
  DELETE_COMMENT_PLAYLIST_MUSIC_FAIL = '@comment_playlist_music/delete_fail',

  LOAD_COMMENT = '@comment/load',
  LOAD_COMMENT_SUCCESS = '@comment/load_success',
  LOAD_COMMENT_FAIL = '@comment/load_fail',

  LOAD_COMMENT_PLAYLIST = '@comment_playlist/load',
  LOAD_COMMENT_PLAYLIST_SUCCESS = '@comment_playlist/load_success',
  LOAD_COMMENT_PLAYLIST_FAIL = '@comment_playlist/load_fail',

  UPDATE_COMMENT_LIKE = '@update_comment/like',
  UPDATE_COMMENT_DISLIKE = '@update_comment/dislike',

  UPGRADE_NUMBER_RESPONSE = '@upgrade_comment/respond',
  DOWNGRADE_NUMBER_RESPONSE = '@downgrade_comment/respond',

  RESET_COMMENT = '@comment/reset'
}

export class ResetComment implements Action {
  readonly type = ActionTypes.RESET_COMMENT
}

export class AddCommentWithoutTrend implements Action {
  readonly type = ActionTypes.ADD_COMMENT_WITHOUT_TREND
  constructor(public payload: CommentModel, public space: string) { }
}

export class AddCommentWithoutTrendSuccess implements Action {
  readonly type = ActionTypes.ADD_COMMENT_WITHOUT_TREND_SUCCESS
  constructor(public payload: CommentModel) { }
}

export class AddCommentWithoutTrendFail implements Action {
  readonly type = ActionTypes.ADD_COMMENT_WITHOUT_TREND_FAIL
  constructor(public payload: any) { }
}

export class AddComment implements Action {
  readonly type = ActionTypes.ADD_COMMENT;
  constructor(public payload: CommentModel, public space: string) { }
}

export class AddCommentSuccess implements Action {
  readonly type = ActionTypes.ADD_COMMENT_SUCCESS;
  constructor(public payload: CommentModel) { }
}

export class AddCommentFail implements Action {
  readonly type = ActionTypes.ADD_COMMENT_FAIL;
  constructor(public payload: any) { }
}

export class LoadCommentById implements Action {
  readonly type = ActionTypes.LOAD_COMMENT;
  constructor(public page: string, public id: string) { }
}

export class LoadCommentByIdFail implements Action {
  readonly type = ActionTypes.LOAD_COMMENT_FAIL;
  constructor(public payload: any) { }
}

export class LoadCommentByIdSuccess implements Action {
  readonly type = ActionTypes.LOAD_COMMENT_SUCCESS;
  constructor(public payload: CommentModel[]) { }
}


export class LoadCommentPlaylist implements Action {
  readonly type = ActionTypes.LOAD_COMMENT_PLAYLIST;
  constructor(public page: string, public id: string) { }
}

export class LoadCommentPlaylistFail implements Action {
  readonly type = ActionTypes.LOAD_COMMENT_PLAYLIST_FAIL;
  constructor(public payload: any) { }
}

export class LoadCommentPlaylistSuccess implements Action {
  readonly type = ActionTypes.LOAD_COMMENT_PLAYLIST_SUCCESS;
  constructor(public payload: CommentModel[]) { }
}

export class PutComment implements Action {
  readonly type = ActionTypes.PUT_COMMENT;
  constructor(public text: string, public idComment: string) { }
}

export class PutCommentSuccess implements Action {
  readonly type = ActionTypes.PUT_COMMENT_SUCCESS;
  constructor(public payload: CommentModel) { }
}

export class PutCommentFail implements Action {
  readonly type = ActionTypes.PUT_COMMENT_FAIL;
  constructor(public payload: any) { }
}

export class DeleteCommentPlaylistMusic implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_PLAYLIST_MUSIC;
  constructor(public commentId: string, public playlistId: string) { }
}

export class DeleteCommentPlaylistMusicSuccess implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_PLAYLIST_MUSIC_SUCCESS;
  constructor(public payload: CommentModel) { }
}

export class DeleteCommentPlaylistMusicFail implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_PLAYLIST_MUSIC_FAIL;
  constructor(public payload: any) { }
}

export class DeleteComment implements Action {
  readonly type = ActionTypes.DELETE_COMMENT;
  constructor(public commentId: string, public publicationId: string) { }
}

export class DeleteCommentSuccess implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_SUCCESS;
  constructor(public payload: CommentModel) { }
}

export class DeleteCommentFail implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_FAIL;
  constructor(public payload: any) { }
}

////

export class UpdateLike implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT_LIKE;
  constructor(public id: string) { }
}

export class UpdateDisLike implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT_DISLIKE;
  constructor(public id: string) { }
}

export class UpgradeRespond implements Action {
  readonly type = ActionTypes.UPGRADE_NUMBER_RESPONSE;
  constructor(public payload: CommentModel) { }
}

export class DowngradeRespond implements Action {
  readonly type = ActionTypes.DOWNGRADE_NUMBER_RESPONSE;
  constructor(public payload: CommentModel) { }
}

export type ActionsComment =
  | AddCommentWithoutTrend
  | AddCommentWithoutTrendSuccess
  | AddCommentWithoutTrendFail
  | AddComment
  | AddCommentSuccess
  | AddCommentFail
  | LoadCommentById
  | LoadCommentByIdSuccess
  | LoadCommentByIdFail
  | LoadCommentPlaylist
  | LoadCommentPlaylistSuccess
  | LoadCommentPlaylistFail
  | PutComment
  | PutCommentSuccess
  | PutCommentFail
  | DeleteComment
  | DeleteCommentSuccess
  | DeleteCommentFail
  | UpdateLike
  | UpdateDisLike
  | UpgradeRespond
  | DowngradeRespond
  | ResetComment
  | DeleteCommentPlaylistMusic
  | DeleteCommentPlaylistMusicSuccess
  | DeleteCommentPlaylistMusicFail

