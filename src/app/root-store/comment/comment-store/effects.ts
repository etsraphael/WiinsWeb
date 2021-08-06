import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as featureActions from './actions';
import { ActionsComment } from './actions';
import { CommentService } from 'src/app/core/services/publications/comment/comment.service';
import { CommentModel } from 'src/app/core/models/comment/comment.model';

@Injectable()
export class CommentFeatureStoreEffects {
  constructor(private dataService: CommentService, private actions$: Actions) { }

  getComment$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadCommentById>(featureActions.ActionTypes.LOAD_COMMENT),
    switchMap(action => this.dataService.GetCommentById(action.page, action.id).pipe(
      map(response => new featureActions.LoadCommentByIdSuccess(response.results)),
      catchError(error => observableOf(new featureActions.LoadCommentByIdFail(error)))
    ))
  ));

  getCommentPlaylist$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadCommentPlaylist>(featureActions.ActionTypes.LOAD_COMMENT_PLAYLIST),
    switchMap(action => this.dataService.GetCommentByIdPlaylist(action.page, action.id).pipe(
      map(response => new featureActions.LoadCommentPlaylistSuccess(response.results)),
      catchError(error => observableOf(new featureActions.LoadCommentPlaylistFail(error)))
    ))
  ));

  creatComment$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddComment>(featureActions.ActionTypes.ADD_COMMENT),
    switchMap(action => this.pageOrprofile(action.payload, action.space)),
    catchError(error => observableOf(new featureActions.AddCommentFail(error)))
  ));

  creatCommentWithoutTrend$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddCommentWithoutTrend>(featureActions.ActionTypes.ADD_COMMENT_WITHOUT_TREND),
    switchMap(action => this.pageOrprofileWithoutTrend(action.payload, action.space)),
    catchError(error => observableOf(new featureActions.AddCommentWithoutTrendFail(error)))
  ));

  putComment$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.PutComment>(featureActions.ActionTypes.PUT_COMMENT),
    switchMap(action => this.dataService.PutComment(action.text, action.idComment).pipe(
      map(response => new featureActions.PutCommentSuccess(response.comment)),
      catchError(error => observableOf(new featureActions.PutCommentFail(error)))
    ))
  ));

  deleteComment$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteComment>(featureActions.ActionTypes.DELETE_COMMENT),
    switchMap(action => this.dataService.DeleteComment(action.commentId, action.publicationId).pipe(
      map(response => new featureActions.DeleteCommentSuccess(response.comment)),
      catchError(error => observableOf(new featureActions.DeleteCommentFail(error)))
    ))
  ))

  deleteCommentPlaylistMusic$: Observable<ActionsComment> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteCommentPlaylistMusic>(featureActions.ActionTypes.DELETE_COMMENT_PLAYLIST_MUSIC),
    switchMap(action => this.dataService.deleteCommentPlaylistMusic(action.commentId, action.playlistId).pipe(
      map(response => new featureActions.DeleteCommentPlaylistMusicSuccess(response.comment)),
      catchError(error => observableOf(new featureActions.DeleteCommentPlaylistMusicFail(error)))
    ))
  ))

  pageOrprofile(comment: CommentModel, space: string) {

    switch (space) {
      case 'page':
        return this.dataService.PostCommentToPage(comment).pipe(
          map(data => new featureActions.AddCommentSuccess(data.comment))
        );
      case 'profile':
        return this.dataService.PostCommentToProfile(comment).pipe(
          map(data => new featureActions.AddCommentSuccess(data.comment))
        );
      case 'playlist':
        return this.dataService.PostCommentToPlaylist(comment).pipe(
          map(data => new featureActions.AddCommentSuccess(data.comment))
        );
    }
  }

  pageOrprofileWithoutTrend(comment: CommentModel, space: string) {

    switch (space) {
      case 'page':
        return this.dataService.PostCommentToPage(comment).pipe(
          map(data => new featureActions.AddCommentWithoutTrendSuccess(data.comment))
        );
      case 'profile':
        return this.dataService.PostCommentToProfile(comment).pipe(
          map(data => new featureActions.AddCommentWithoutTrendSuccess(data.comment))
        );
      case 'playlist':
        return this.dataService.PostCommentToPlaylist(comment).pipe(
          map(data => new featureActions.AddCommentWithoutTrendSuccess(data.comment))
        );
    }
  }
}
