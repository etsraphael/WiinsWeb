import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import * as featureActions from './actions';
import { PlaylistMusicService } from 'src/app/core/services/playlistMusic/playlist-music.service';

@Injectable()
export class MyMusicLikedStoreEffects {
  constructor(private dataService: PlaylistMusicService, private actions$: Actions) {}

  loadMyMusic$: Observable<featureActions.ActionsMyMusic> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadMyMusic>(featureActions.ActionTypes.LOAD_MY_MUSIC),
    switchMap(() => this.dataService.getMyMusic().pipe(
      map(data => new featureActions.LoadMyMusicSuccess(data.playlist)),
      catchError(error => observableOf(new featureActions.LoadMyMusicFail(error)))
    ))
  ))

  likeMusic$: Observable<featureActions.ActionsMyMusic> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LikeMusic>(featureActions.ActionTypes.LIKE_MUSIC),
    switchMap(action => this.dataService.likeMusic(action.music._id).pipe(
      map(data => new featureActions.LikeMusicSuccess(data.reponse)),
      catchError(error => observableOf(new featureActions.LikeMusicFail(error)))
    ))
  ))

  dislikeMusic$: Observable<featureActions.ActionsMyMusic> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DisLikeMusic>(featureActions.ActionTypes.DISLIKE_MUSIC),
    switchMap(action => this.dataService.dislikeMusic(action.music._id).pipe(
      map(data => new featureActions.DisLikeMusicSuccess(data.reponse)),
      catchError(error => observableOf(new featureActions.DisLikeMusicFail(error)))
    ))
  ))

}


