import { Action } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of as observableOf, of } from 'rxjs'
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators'
import * as featureActions from './actions'
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service'
import { CoreService, ResponseGetUserAndProfile } from 'src/app/core/services/core/core.service'
import { WsService } from 'src/app/core/services/ws/ws.service'
import { Message } from 'src/app/core/models/messenger/message.model'
import { RoomByIdStoreActions } from '../messenger/room-by-id-store'
import { StatePlarformService } from 'src/app/core/statePlarform/state-plarform.service'
import { CurrentRoomStoreActions } from '../messenger/current-room-store'
import { MessengerService } from 'src/app/core/services/messenger/messenger.service'
import { AllRoomsStoreActions } from '../messenger/all-rooms-store'
import { TranslateService } from '@ngx-translate/core'
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class MyUserEffects {
  constructor(
    private auth: AuthenticationService,
    private userUpdate: CoreService,
    private actions$: Actions,
    private ws: WsService,
    private plateformState: StatePlarformService,
    private messengerS: MessengerService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router
  ) { }

  loadMyUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadUser>(featureActions.ActionTypes.LOAD_USER),
    switchMap((action: featureActions.LoadUser) => this.auth.login(action.emailOrPseudo, action.password).pipe(
      tap((response: ResponseGetUserAndProfile) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }),
      mergeMap((response: ResponseGetUserAndProfile) => [
        new ProfileFeatureStoreActions.GetProfileSuccess(response.profile),
        new featureActions.LoadUserSuccess(response.user, response.token)
      ]),
      tap(() => this.router.navigate(['/SpaceDiscover/#'])),
      catchError((response: HttpErrorResponse) => observableOf(new featureActions.LoadUserFail(response.error.message)))
    ))
  ))

  loadMyUserWithToken$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadUserWithToken>(featureActions.ActionTypes.LOAD_USER_WITH_TOKEN),
    switchMap(action => this.auth.getUserWithToken(action.token).pipe(
      map(response => new featureActions.LoadUserWithTokenSuccess(response.user)),
      catchError(err => observableOf(new featureActions.LoadUserWithTokenFail(err)))
    ))
  ))

  updateMyUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateUser>(featureActions.ActionTypes.UPDATE_USER),
    switchMap(action => this.userUpdate.UserUpdate(action.payload).pipe(
      tap(data => {
        localStorage.setItem('user', JSON.stringify(data))
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.update-is-done'), null,
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        )
        setTimeout(() => window.location.reload(), 2000);
      }),
      map(response => new featureActions.UpdateUserSuccess(response.user)),
      catchError(err => observableOf(new featureActions.UpdateUserFail(err))),
    ))
  ))

  messageWs$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.WebSocketConnect>(featureActions.ActionTypes.CONNECT_WEB_SOCKET),
    mergeMap(action => of(this.ws.createConnexion(action.token)).pipe(
      mergeMap(socket => this.ws.handleOnMessage(socket)),
      mergeMap(data => { return this.updatePlateform(data) }),
      catchError(err => observableOf(new featureActions.WebSocketConnectFail(err))),
    ))
  ))


  updatePlateform(data: Message): Action[] {
    const state = this.plateformState.getState()

    switch (true) {
      case state.main_roomActif === 'nothing': {
        this.messengerS.NotificationSound()
        return [
          new CurrentRoomStoreActions.updateNotification(data.room),
          new AllRoomsStoreActions.updateNotification(data.room)
        ]
      }
      case state.main_roomActif == data.room: {
        return [new AllRoomsStoreActions.receiveMessage(data)]
      }
      case state.mini_roomActif == data.room: {
        return [new RoomByIdStoreActions.receiveMessage(data)]
      }
      case state.current_room.includes(data.room) && state.page_actif == false: {
        this.messengerS.NotificationSound()
        return [new CurrentRoomStoreActions.updateNotification(data.room)]
      }
      case state.current_room.includes(data.room) && state.page_actif == true: {
        return [new CurrentRoomStoreActions.updateNotification(data.room)]
      }
      case state.current_room.includes(data.room) == false: {
        this.messengerS.NotificationSound()
        return [new CurrentRoomStoreActions.addCurrentRoom(data.room)]
      }
      default: {
        return [new featureActions.keepState]
      }
    }
  }

}
