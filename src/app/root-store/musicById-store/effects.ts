import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import * as featureActions from './actions';
import { ActionsMusicById } from './actions';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/core/services/publications/music/music.service';

@Injectable()
export class MusicByIdStoreEffects {
  constructor(private dataService: MusicService, private actions$: Actions, private router: Router) { }

  loadMusic$: Observable<ActionsMusicById> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadMusicById>(featureActions.ActionTypes.LOAD_MUSIC_BY_ID),
    switchMap(action => this.dataService.GetMusicById(action.id).pipe(
      map(data => new featureActions.LoadMusicByIdSuccess(data.music)),
      catchError(error => observableOf(new featureActions.LoadMusicByIdFail(error)))
    ))
  ))


}


