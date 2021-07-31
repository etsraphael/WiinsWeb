import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import * as featureActions from './actions';
import { Router } from '@angular/router';
import { PlaylistMusicService } from 'src/app/core/services/playlistMusic/playlist-music.service';

@Injectable()
export class PlaylistStoreEffects {
  constructor(
    private dataService: PlaylistMusicService,
    private actions$: Actions,
   private router: Router
  ) {}

  loadplaylistbyId$: Observable<featureActions.ActionsPlaylistById> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadPlaylistById>(featureActions.ActionTypes.LOAD_PLAYLIST_BY_ID),
    switchMap(action => this.dataService.getPlaylistById(action.id).pipe(
      map(data => new featureActions.LoadPlaylistByIdSuccess(data.playlist)),
      catchError(error => observableOf(new featureActions.LoadPlaylistByIdFail(error)))
    ))
  ));

  createplaylist$: Observable<featureActions.ActionsPlaylistById> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.CreatePlaylist>(featureActions.ActionTypes.CREATE_PLAYLIST),
    switchMap(action => this.dataService.createPlaylist(action.payload).pipe(
      tap(data => this.router.navigate(['./SpaceMusic/playlist/' + data.playlist._id])),
      map(data => new featureActions.CreatePlaylistSuccess(data.playlist)),
      catchError(error => observableOf(new featureActions.CreatePlaylistFail(error)))
    ))
  ));
}


