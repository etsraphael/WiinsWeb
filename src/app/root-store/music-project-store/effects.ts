import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import * as featureActions from './actions'
import { ActionsMusicProject } from './actions'
import { Router } from '@angular/router'
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { Action } from '@ngrx/store'
import { MatSnackBar } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'
import { MusicService } from 'src/app/core/services/publications/music/music.service'

@Injectable()
export class MusicProjectStoreEffects {
  
  constructor(
    private dataService: MusicService,
    private actions$: Actions,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  @Effect()
  creatMusic: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.AddMusicProject>(featureActions.ActionTypes.ADD_MUSIC_PROJECT),
    switchMap(action => this.dataService.createFeedPublication(action.payload).pipe(
      tap(() => this.router.navigate(['/myprofile/Music'])),
      mergeMap(item => {
        if (item.actifSpace !== null) {
          return [
            new featureActions.AddMusicProjectSuccess(item.publication),
            new ProfileFeatureStoreActions.udapteActifSpace(item.actifSpace)
          ]
        } else return [new featureActions.AddMusicProjectSuccess(item.publication)]
      }),
      catchError(error => observableOf(new featureActions.AddMusicProjectFail(error)))
    ))
  )

  @Effect()
  loadMusicByProfile: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.LoadMusicProjectByProfile>(featureActions.ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE),
    switchMap(action => this.dataService.LoadMusicByProfile(action.id).pipe(
      map(items => new featureActions.LoadMusicProjectByProfileSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadMusicProjectByProfileFail(error)))
    ))
  )

  @Effect()
  loadMusicByMyProfile: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.LoadMusicProjectByMyProfile>(featureActions.ActionTypes.LOAD_MUSIC_PROJECT_BY_MY_PROFILE),
    switchMap(() => this.dataService.LoadMusicByMyProfile().pipe(
      map(items => new featureActions.LoadMusicProjectByProfileSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadMusicProjectByProfileFail(error)))
    ))
  )

  @Effect()
  updateMusic: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.UpdateMusic>(featureActions.ActionTypes.UPDATE_MUSIC),
    switchMap(action => this.dataService.UpdateMusic(action.payload, action.categorie).pipe(
      tap(() => 
      this._snackBar.open(
        this.translate.instant('VALID-MESSAGE.update-is-done'),
        null, { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )),
      map(items => new featureActions.UpdateMusicSuccess(items.publication)),
      catchError(error => observableOf(new featureActions.UpdateMusicFail(error)))
    ))
  )

  @Effect()
  updateMusicProject: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.UpdateMusicProject>(featureActions.ActionTypes.UPDATE_MUSIC_PROJECT),
    switchMap(action => this.dataService.UpdateMusicProject(action.payload, action.password).pipe(
      mergeMap(items => this.checkThePasswordMusicProjectUdpate(items)),
      catchError(error => observableOf(new featureActions.UpdateMusicProjectFail(error)))
    ))
  )

  @Effect()
  deletePlaylist: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.DeletePlaylist>(featureActions.ActionTypes.DELETE_PLAYLIST),
    switchMap(action => this.dataService.DeletePlaylist(action.id, action.password).pipe(
      map(items => new featureActions.DeletePlaylistSuccess(items.publication)),
      catchError(error => observableOf(new featureActions.DeletePlaylistFail(error)))
    ))
  )

  @Effect()
  deleteMusic: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.DeleteMusic>(featureActions.ActionTypes.DELETE_MUSIC),
    switchMap(action => this.dataService.DeleteMusic(action.publicationID, action.musicID, action.password).pipe(
      mergeMap(items => this.checkThePasswordMusic(items)),
      catchError(error => observableOf(new featureActions.DeleteMusicFail(error)))
    ))
  )

  @Effect()
  deleteMusicProject: Observable<ActionsMusicProject> = this.actions$.pipe(
    ofType<featureActions.deleteMusicProject>(featureActions.ActionTypes.DELETE_MUSIC_PROJECT),
    switchMap(action => this.dataService.DeleteMusicProject(action.id, action.password).pipe(
      mergeMap(item => this.checkThePasswordMusicProject(item)),
      catchError(error => observableOf(new featureActions.deleteMusicProjectFail(error)))
    ))
  )


  checkThePasswordMusicProjectUdpate(items: any): ActionsMusicProject[] {
    switch (items.message) {
      case 'success':
        return [new featureActions.UpdateMusicProjectSuccess(items.publication)]
      case 'email_or_password_invalid':
        return [new featureActions.WrongPassword(items.message)]
    }
  }

  checkThePasswordMusicProject(items: any): ActionsMusicProject[] {
    switch (items.message) {
      case 'success':
        return [new featureActions.deleteMusicProjectSuccess(items.publication._id)]
      case 'email_or_password_invalid':
        return [new featureActions.WrongPassword(items.message)]
    }
  }

  checkThePasswordMusic(items: any): ActionsMusicProject[] {
    switch (items.message) {
      case 'success':
        return [new featureActions.DeleteMusicSuccess(items.publication)]
      case 'email_or_password_invalid':
        return [new featureActions.WrongPassword(items.message)]
    }
  }


}


