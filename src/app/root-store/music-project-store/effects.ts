import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import * as featureActions from './actions'
import { ActionsMusicProject } from './actions'
import { Router } from '@angular/router'
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { Action } from '@ngrx/store'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { MusicProjectResponse, MusicService } from 'src/app/core/services/publications/music/music.service'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class MusicProjectStoreEffects {
  
  constructor(
    private dataService: MusicService,
    private actions$: Actions,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  creatMusic$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddMusicProject>(featureActions.ActionTypes.ADD_MUSIC_PROJECT),
    switchMap(action => this.dataService.createFeedPublication(action.payload).pipe(
      tap((action: MusicProjectResponse) => this.router.navigate(['/profile/'+ action.musicProject.profile._id + '/Music'])),
      mergeMap(item => {
        if (item.actifSpace !== null) {
          return [
            new featureActions.AddMusicProjectSuccess(item.musicProject),
            new ProfileFeatureStoreActions.udapteActifSpace(item.actifSpace)
          ]
        } else return [new featureActions.AddMusicProjectSuccess(item.musicProject)]
      }),
      catchError((error) => {
        return observableOf(new featureActions.AddMusicProjectFail(error))
        })
    ))
  ))

  loadMusicByProfile$: Observable<ActionsMusicProject> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadMusicProjectByProfile>(featureActions.ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE),
    switchMap(action => this.dataService.LoadMusicByProfile(action.id).pipe(
      map(items => new featureActions.LoadMusicProjectByProfileSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadMusicProjectByProfileFail(error)))
    ))
  ))

  loadMusicByMyProfile$: Observable<ActionsMusicProject> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadMusicProjectByMyProfile>(featureActions.ActionTypes.LOAD_MUSIC_PROJECT_BY_MY_PROFILE),
    switchMap(() => this.dataService.LoadMusicByMyProfile().pipe(
      map(items => new featureActions.LoadMusicProjectByMyProfileSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadMusicProjectByMyProfileFail(error)))
    ))
  ))

  updateMusic$: Observable<ActionsMusicProject> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateMusic>(featureActions.ActionTypes.UPDATE_MUSIC),
    switchMap(action => this.dataService.UpdateMusic(action.payload, action.categorie).pipe(
      tap(() => 
      this._snackBar.open(
        this.translate.instant('VALID-MESSAGE.update-is-done'),
        null, { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      )),
      map(items => new featureActions.UpdateMusicSuccess(items.musicProject)),
      catchError(error => observableOf(new featureActions.UpdateMusicFail(error)))
    ))
  ))

  updateMusicProject$: Observable<ActionsMusicProject> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateMusicProject>(featureActions.ActionTypes.UPDATE_MUSIC_PROJECT),
    switchMap(action => this.dataService.UpdateMusicProject(action.payload, action.password).pipe(
      map(items => new featureActions.UpdateMusicProjectSuccess(items.musicProject)),
      catchError(error => observableOf(new featureActions.UpdateMusicProjectFail(error)))
    ))
  ))

  deletePlaylist$: Observable<ActionsMusicProject> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeletePlaylist>(featureActions.ActionTypes.DELETE_PLAYLIST),
    switchMap(action => this.dataService.DeletePlaylist(action.id, action.password).pipe(
      map(items => new featureActions.DeletePlaylistSuccess(items.musicProject)),
      catchError((response: HttpErrorResponse) => observableOf(new featureActions.DeletePlaylistFail(response.error.message)))
    ))
  ))

  deleteMusic$: Observable<ActionsMusicProject> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteMusic>(featureActions.ActionTypes.DELETE_MUSIC),
    switchMap(action => this.dataService.DeleteMusic(action.publicationID, action.musicID, action.password).pipe(
      map(items => new featureActions.DeleteMusicSuccess(items.musicProject)),
      catchError((response: HttpErrorResponse) => observableOf(new featureActions.DeleteMusicFail(response.error.message)))
    ))
  ))

  deleteMusicProject$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.deleteMusicProject>(featureActions.ActionTypes.DELETE_MUSIC_PROJECT),
    switchMap(action => this.dataService.DeleteMusicProject(action.id, action.password).pipe(
      map((item: MusicProjectResponse) => new featureActions.deleteMusicProjectSuccess(item.musicProject._id)),
      catchError((response: HttpErrorResponse) => observableOf(new featureActions.deleteMusicProjectFail(response.error.message)))
    ))
  ))

}


