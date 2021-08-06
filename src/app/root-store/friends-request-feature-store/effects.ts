import { FriendRequestService } from '../../core/services/friend/friend-request.service'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of as observableOf } from 'rxjs'
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators'
import * as featureActions from './actions'
import { ActionsFriendRequest } from './actions'
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { GroupService } from 'src/app/core/services/group/group.service'

@Injectable()
export class FriendsRequestFeatureStoreEffects {
  constructor(
    private dataService: FriendRequestService,
    private actions$: Actions,
    private groupService: GroupService
  ) { }

  createRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.CreateFriendRequest>(featureActions.ActionTypes.FRIEND_REQUEST),
    switchMap(action => this.dataService.Create(action.id).pipe(
      mergeMap(response => [
        new featureActions.FriendRequestSuccess(response.request),
        new ProfileFeatureStoreActions.askCreated
      ]),
      catchError(err => observableOf(new featureActions.FriendRequestFail(err)))))
  ))

  acceptFriendRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AcceptFriendRequest>(featureActions.ActionTypes.FRIEND_REQUEST_ACCEPT),
    switchMap(action => this.dataService.ConfirmWidthProfile(action.id).pipe(
      map(response => new featureActions.FriendRequestSuccess(response.request)),
      catchError(err => observableOf(new featureActions.FriendRequestFail(err)))
    ))
  ))

  acceptGroupRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ConfirmGroupRequest>(featureActions.ActionTypes.CONFIRM_GROUP_REQUEST),
    switchMap(action => this.groupService.AcceptRequest(action.id).pipe(
      map(response => new featureActions.ConfirmGroupRequestSuccess(response.request)),
      catchError(err => observableOf(new featureActions.ConfirmGroupRequestFail(err)))
    ))
  ))

  refuseGroupRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.RefuseGroupRequest>(featureActions.ActionTypes.REFUSE_GROUP_REQUEST),
    switchMap(action => this.groupService.RefuseRequest(action.id).pipe(
      map(response => new featureActions.RefuseGroupRequestSuccess(response.request)),
      catchError(err => observableOf(new featureActions.RefuseGroupRequestFail(err)))
    ))
  ))


  confirmRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ConfirmFriendRequest>(featureActions.ActionTypes.CONFIRM_FRIEND_REQUEST),
    switchMap(action => this.dataService.ConfirmWidthProfile(action.id).pipe(
      mergeMap(response => [
        new featureActions.ConfirmFriendRequestSuccess(response.request),
        new ProfileFeatureStoreActions.AcceptedAsk
      ]),
      catchError(err => observableOf(new featureActions.ConfirmFriendRequestFail(err)))
    ))
  ))

  rejectRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.RejectFriendRequest>(featureActions.ActionTypes.FRIEND_REQUEST_REJECT),
    switchMap(action => this.dataService.RefuseWidthProfile(action.id).pipe(
      map(response => new featureActions.FriendRequestSuccess(response.request)),
      catchError(err => observableOf(new featureActions.FriendRequestFail(err)))
    ))
  ))

  deleteRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteFriendRequest>(featureActions.ActionTypes.DELETE_REQUEST),
    switchMap(action => this.dataService.CancelWidthProfile(action.id).pipe(
      mergeMap(response => [
        new featureActions.DeleteFriendRequestSuccess(Number(response.message)),
        new ProfileFeatureStoreActions.RefusedAsk
      ]),
      catchError(err => observableOf(new featureActions.DeleteFriendRequestFail(err)))
    ))
  ))

  getAllRequest$: Observable<ActionsFriendRequest> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.GetFriendRequests>(featureActions.ActionTypes.GET_FRIEND_REQUESTS),
    switchMap(() => this.dataService.GetAll().pipe(
      map(response => new featureActions.GetFriendRequestsSuccess(response.results)),
      catchError(err => observableOf(new featureActions.GetFriendRequestsFail(err)))
    ))
  ));

  LoadRequestToMe$: Observable<ActionsFriendRequest> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadFriendRequestsToMe>(featureActions.ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME),
    switchMap(() => this.dataService.GetRequestToMe().pipe(
      map(response => new featureActions.LoadFriendRequestsToMeSuccess(response.results)),
      catchError(err => observableOf(new featureActions.LoadFriendRequestsToMeFail(err)))
    ))
  ));

}
