import { LikeService } from '../../core/services/publications/like/like.service'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as featureActions from './actions'
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { ActionsPushLike } from './actions'
import { CommentFeatureStoreActions } from '../comment/comment-store'
import { Action } from '@ngrx/store'


@Injectable()
export class PushLikeFeatureEffects {
  constructor(
    private dataLikeService: LikeService,
    private actions$: Actions
  ) { }


  addLike$: Observable<ActionsPushLike> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddLike>(featureActions.ActionTypes.ADD_LIKE),
    switchMap( data => this.dataLikeService.addFeedPublicationLike(data.payload).pipe(
      map(items => new featureActions.AddLikeSuccess(items.status)),
      catchError(error => observableOf(new featureActions.AddLikeFail(error)))
    ))
  ))


  deleteLike$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteLike>(featureActions.ActionTypes.DELETE_LIKE),
    switchMap( data => this.dataLikeService.deleteFeedPublicationLike(data.id).pipe(
      map(items => new featureActions.DeleteLikeSuccess(items.status)),
      catchError(error => observableOf(new featureActions.DeleteLikeFail(error)))
    ))
  ))


  addLikeComment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddLikeComment>(featureActions.ActionTypes.ADD_LIKE_COMMENT),
    switchMap( data => this.dataLikeService.addLikeComment(data.payload).pipe(
      mergeMap(items => [
        new featureActions.AddLikeCommentSuccess(items.status),
        new CommentFeatureStoreActions.UpdateLike(items.id)
      ]),
      catchError(error => observableOf(new featureActions.AddLikeCommentFail(error)))
    ))
  ))

  deleteLikeComment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteLikeComment>(featureActions.ActionTypes.DELETE_LIKE_COMMENT),
    switchMap( data => this.dataLikeService.deleteLikeComment(data.id).pipe(
      mergeMap(items => [
        new featureActions.DeleteLikeCommentSuccess(items.status),
        new CommentFeatureStoreActions.UpdateDisLike(items.id)
      ]),
      catchError(error => observableOf(new featureActions.DeleteLikeCommentFail(error)))
    ))
  ))

}
