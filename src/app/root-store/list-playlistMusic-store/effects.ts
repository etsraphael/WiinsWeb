import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import * as featureActions from './actions';
import { PlaylistMusicService } from 'src/app/core/services/playlistMusic/playlist-music.service';

@Injectable()
export class PlaylistStoreEffects {
  constructor(private dataService: PlaylistMusicService, private actions$: Actions) { }

  loadplaylist$: Observable<featureActions.ActionsPlaylist> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadPlaylists>(featureActions.ActionTypes.LOAD_PLAYLISTS),
    switchMap(action => this.dataService.GetPlaylistByType(action.name, action.page).pipe(
      map(data => new featureActions.LoadPlaylistsSuccess(data.results)),
      catchError(error => observableOf(new featureActions.LoadPlaylistsFail(error)))
    ))
  ))

}