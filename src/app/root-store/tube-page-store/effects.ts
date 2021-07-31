import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { PageTubeActions } from './actions'
import * as featureActions from './actions'
import { TubeService } from 'src/app/core/services/tube/tube.service'
import { FriendService } from 'src/app/core/services/friend/friend.service'
import { CurrentRoomStoreActions } from '../messenger/current-room-store'
import { Action } from '@ngrx/store'
import { CoreService } from 'src/app/core/services/core/core.service'

@Injectable()
export class TubePageStoreEffects {

  constructor(
    private dataService: TubeService,
    private coreService: CoreService,
    private actions$: Actions,
    private friendService: FriendService
  ) { }

  loadMenu$: Observable<PageTubeActions> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadPageTube>(featureActions.ActionTypes.LOAD_TUBE_PAGE),
    switchMap(action => this.dataService.getTubePage(action.id).pipe(
      map( items => new featureActions.LoadPageTubeSuccess(items.page)),
      catchError(error => observableOf(new featureActions.LoadPageTubeFail(error)))
    )))
  )


  deleteFriends$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteFriend>(featureActions.ActionTypes.DELETE_FRIEND),
    switchMap((action: featureActions.DeleteFriend) => this.friendService.DeleteFriend(action.id).pipe(
      mergeMap((response) => [
        new featureActions.DeleteFriendSuccess(response.profile),
        new CurrentRoomStoreActions.deleteRoomByProfile(response.friendId)
      ]),
      catchError(err => observableOf(new featureActions.DeleteFriendFail(err)))
    )))
  )

  followProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.FollowProfile>(featureActions.ActionTypes.FOLLOW_PROFILE),
    switchMap(action => this.coreService.FollowProfile(action.id).pipe(
      map((response) => new featureActions.FollowProfileSuccess(response.message)),
      catchError(err => observableOf(new featureActions.FollowProfileFail(err)))))
  ))

  unfollowProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UnFollowProfile>(featureActions.ActionTypes.UNFOLLOW_PROFILE),
    switchMap(action => this.coreService.UnFollowProfile(action.id).pipe(
      map((response) => new featureActions.UnFollowProfileSuccess(response.message)),
      catchError(err => observableOf(new featureActions.UnFollowProfileFail(err)))))
  ))

}