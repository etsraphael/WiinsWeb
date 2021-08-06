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
  ) { }

  loadplaylist$: Observable<featureActions.ActionsPlaylist> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadPlaylist>(featureActions.ActionTypes.LOAD_PLAYLIST),
    switchMap(() => this.dataService.getListPlaylist().pipe(
      map(data => new featureActions.LoadPlaylistSuccess(data.results)),
      catchError(error => observableOf(new featureActions.LoadPlaylistFail(error)))
    ))
  ))

  loadMenu$: Observable<featureActions.ActionsPlaylist> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadPlaylistMenu>(featureActions.ActionTypes.LOAD_MENU),
    switchMap(() => this.dataService.GetMenuPlaylist().pipe(
      map(data => new featureActions.LoadPlaylistMenuSuccess(data.menu)),
      catchError(error => observableOf(new featureActions.LoadPlaylistMenuFail(error)))
    ))
  ))
}


