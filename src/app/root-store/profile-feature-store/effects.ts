import { Action } from '@ngrx/store'
import { CoreService } from '../../core/services/core/core.service'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of as observableOf } from 'rxjs'
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators'
import * as featureActions from './actions'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { FriendService } from 'src/app/core/services/friend/friend.service'
import { SettingUserService } from 'src/app/core/services/setting-user/setting-user.service'
import { CurrentRoomStoreActions } from '../messenger/current-room-store'

@Injectable()
export class ProfileFeatureEffects {
  
  constructor(
    private dataService: CoreService,
    private friendService: FriendService,
    private settingUser: SettingUserService,
    private actions$: Actions
  ) { }

  loadCurrentUserProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetProfile>(featureActions.ActionTypes.GET_PROFILE),
    switchMap(() => this.dataService.GetCurrentProfile().pipe(
      map(response => new featureActions.GetProfileSuccess(response.profile)),
      catchError(err => observableOf(new featureActions.GetProfileFail(err))))
    )
  ))

  updateProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateProfile>(featureActions.ActionTypes.UPDATE_PROFILE),
    switchMap((action: featureActions.UpdateProfile) => this.dataService.UpdateCurrentProfile(action.payload).pipe(
      map((response: ProfileModel) => new featureActions.UpdateProfileSuccess(response)),
      catchError(err => { return observableOf(new featureActions.UpdateProfileFail(err)) }))
    )
  ))

  getProfileByPseudo$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetProfileByPseudo>(featureActions.ActionTypes.GET_PROFILE_BY_PSEUDO),
    switchMap((action: featureActions.GetProfileByPseudo) => this.dataService.GetProfileByPseudo(action.id).pipe(
      map(response => new featureActions.GetProfileByPseudoSuccess(response.profile)),
      catchError(err => observableOf(new featureActions.GetProfileByPseudoFail(err)))))
  ))

  getProfileById$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetProfileById>(featureActions.ActionTypes.GET_PROFILE_BY_ID),
    switchMap(action => this.dataService.GetProfileById(action.id).pipe(
      map(response => new featureActions.GetProfileByIdSuccess(response.profile)),
      catchError(err => observableOf(new featureActions.GetProfileByIdFail(err)))))
  ))

  deleteFriends$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteFriend>(featureActions.ActionTypes.DELETE_FRIEND),
    switchMap((action: featureActions.DeleteFriend) => this.friendService.DeleteFriend(action.id).pipe(
      mergeMap((response) => [
        new featureActions.DeleteFriendSuccess(response.profile),
        new CurrentRoomStoreActions.deleteRoomByProfile(response.friendId)
      ]),
      catchError(err => observableOf(new featureActions.DeleteFriendFail(err)))
    ))
  ))

  updateBtnFolow$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ChangeBtnFollow>(featureActions.ActionTypes.CHANGE_BTN_FOLLOW),
    switchMap((action: featureActions.ChangeBtnFollow) => this.settingUser.changeBtnFollow(action.payload).pipe(
      map((response) => new featureActions.ChangeBtnFollowSuccess(response.btnOption)),
      catchError(err => observableOf(new featureActions.ChangeBtnFollowFail(err)))))
  ))

  followProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.FollowProfile>(featureActions.ActionTypes.FOLLOW_PROFILE),
    switchMap(action => this.dataService.FollowProfile(action.id).pipe(
      map((response) => new featureActions.FollowProfileSuccess(response.message)),
      catchError(err => observableOf(new featureActions.FollowProfileFail(err)))))
  ))

  unfollowProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UnFollowProfile>(featureActions.ActionTypes.UNFOLLOW_PROFILE),
    switchMap(action => this.dataService.UnFollowProfile(action.id).pipe(
      map((response) => new featureActions.UnFollowProfileSuccess(response.message)),
      catchError(err => observableOf(new featureActions.UnFollowProfileFail(err)))))
  ))

  updateProfileAvatar$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateAvatar>(featureActions.ActionTypes.UPDATE_AVATAR),
    switchMap(action => this.dataService.UpdatePictureProfile(action.avatar, 'avatar').pipe(
      map((response) => new featureActions.UpdateAvatarSuccess(response.link)),
      catchError(err => observableOf(new featureActions.UpdateAvatarFail(err)))))
  ))

  updateProfileCover$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateCover>(featureActions.ActionTypes.UPDATE_COVER),
    switchMap(action => this.dataService.UpdatePictureProfile(action.cover, 'cover').pipe(
      map((response) => new featureActions.UpdateCoverSuccess(response.link)),
      catchError(err => observableOf(new featureActions.UpdateCoverFail(err)))))
  ))


}
