import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import * as featureActions from './actions'
import { ActionsProfileList } from './actions'
import { CoreService } from 'src/app/core/services/core/core.service'

@Injectable()
export class ProfileListStoreEffects {

  constructor(
    private dataService: CoreService,
    private actions$: Actions
  ) { }

  getProfileList$: Observable<ActionsProfileList> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetProfileList>(featureActions.ActionTypes.GET_PROFILE_LIST),
    switchMap(action => this.dataService.getMyProfileList(action.mode, action.page).pipe(
      map(item => new featureActions.GetProfileListSuccess(item.results)),
      catchError(error => observableOf(new featureActions.GetProfileListFail(error)))
    ))
  ))

  getLikedList$: Observable<ActionsProfileList> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetLikedList>(featureActions.ActionTypes.GET_LIKED_LIST),
    switchMap(action => this.dataService.getLikedList(action.id, action.page).pipe(
      map(item => new featureActions.GetProfileListSuccess(item.results.idsProfil)),
      catchError(error => observableOf(new featureActions.GetProfileListFail(error)))
    ))
  ))


  loadGroupMember$: Observable<ActionsProfileList> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetGroupMember>(featureActions.ActionTypes.GET_GROUP_MEMBER),
    switchMap(action => this.dataService.GetGroupMembers(action.id, action.page, action.total).pipe(
      map( items => new featureActions.GetProfileListSuccess(items.results)),
      catchError(error => observableOf(new featureActions.GetProfileListFail(error)))
    ))
  ))

}


