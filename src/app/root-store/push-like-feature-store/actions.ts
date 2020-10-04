import { Action } from '@ngrx/store';
import {
  likeCommentPublicationModel,
  likeCommentPlaylistModel,
  likeFeedPublicationModel
} from 'src/app/core/models/publication-options/like.model';

export enum ActionTypes {

  ADD_LIKE = '@like/add',
  ADD_LIKE_SUCCESS = '@like/add_success',
  ADD_LIKE_FAIL = '@like/add_fail',

  DELETE_LIKE = '@like/delete',
  DELETE_LIKE_SUCCESS = '@like/delete_success',
  DELETE_LIKE_FAIL = '@like/delete_fail',

  ADD_LIKE_COMMENT = '@like_comment/add',
  ADD_LIKE_COMMENT_SUCCESS = '@like_comment/add_success',
  ADD_LIKE_COMMENT_FAIL = '@like_comment/add_fail',

  DELETE_LIKE_COMMENT = '@like_comment/delete',
  DELETE_LIKE_COMMENT_SUCCESS = '@like_comment/delete_success',
  DELETE_LIKE_COMMENT_FAIL = '@like_comment/delete_fail',
}

export class AddLike implements Action {
  readonly type = ActionTypes.ADD_LIKE;
  constructor(public payload: likeCommentPublicationModel | likeCommentPlaylistModel | likeFeedPublicationModel) { }
}

export class AddLikeSuccess implements Action {
  readonly type = ActionTypes.ADD_LIKE_SUCCESS;
  constructor(public statut: number) { }
}

export class AddLikeFail implements Action {
  readonly type = ActionTypes.ADD_LIKE_FAIL;
  constructor(public payload: any) { }
}

export class DeleteLike implements Action {
  readonly type = ActionTypes.DELETE_LIKE;
  constructor(public id: string) { }
}

export class DeleteLikeSuccess implements Action {
  readonly type = ActionTypes.DELETE_LIKE_SUCCESS;
  constructor(public status: number) { }
}

export class DeleteLikeFail implements Action {
  readonly type = ActionTypes.DELETE_LIKE_FAIL;
  constructor(public payload: any) { }
}

export class AddLikeComment implements Action {
  readonly type = ActionTypes.ADD_LIKE_COMMENT;
  constructor(public payload: likeCommentPublicationModel | likeCommentPlaylistModel) { }
}

export class AddLikeCommentSuccess implements Action {
  readonly type = ActionTypes.ADD_LIKE_COMMENT_SUCCESS;
  constructor(public statut: number) { }
}

export class AddLikeCommentFail implements Action {
  readonly type = ActionTypes.ADD_LIKE_COMMENT_FAIL;
  constructor(public payload: any) { }
}

export class DeleteLikeComment implements Action {
  readonly type = ActionTypes.DELETE_LIKE_COMMENT;
  constructor(public id: string) { }
}

export class DeleteLikeCommentSuccess implements Action {
  readonly type = ActionTypes.DELETE_LIKE_COMMENT_SUCCESS;
  constructor(public statut: number) { }
}

export class DeleteLikeCommentFail implements Action {
  readonly type = ActionTypes.DELETE_LIKE_COMMENT_FAIL;
  constructor(public payload: any) { }
}

export type ActionsPushLike =
  | AddLike
  | AddLikeSuccess
  | AddLikeFail
  | DeleteLike
  | DeleteLikeSuccess
  | DeleteLikeFail
  | AddLikeComment
  | AddLikeCommentSuccess
  | AddLikeCommentFail
  | DeleteLikeComment
  | DeleteLikeCommentSuccess
  | DeleteLikeCommentFail;

