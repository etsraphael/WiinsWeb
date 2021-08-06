import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { MessengerService, SingleRouteResponse } from 'src/app/core/services/messenger/messenger.service'
import { WsService } from 'src/app/core/services/ws/ws.service'
import { ActionsMessage } from './actions'
import * as featureActions from './actions'
import { Action, Store } from '@ngrx/store'
import { Message } from 'src/app/core/models/messenger/message.model'
import { AllRoomsStoreActions } from '../all-rooms-store'
import { CurrentRoomStoreActions } from '../current-room-store'

@Injectable()
export class RoomByIdStoreEffects {
  constructor(
    private dataService: MessengerService,
    private ws: WsService,
    private actions$: Actions) { }


  loadRoomByID$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadRoomById>(featureActions.ActionTypes.LOAD_ROOM_BY_ID),
    switchMap(action => this.dataService.GetRoomByID(action.id, action.page, action.nbMessage).pipe(
      map(data => new featureActions.loadRoomByIdSuccess(data.result)),
      catchError(error => observableOf(new featureActions.loadRoomByIdFail(error)))
    ))
  ))

  loadRoomByIdProfile$: Observable<ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadRoomByIdProfile>(featureActions.ActionTypes.LOAD_ROOM_BY_ID_PROFILE),
    switchMap(action => this.dataService.GetRoomByIdProfile(action.id).pipe(
      map(data => new featureActions.loadRoomByIdProfileSuccess(data.result)),
      catchError(error => observableOf(new featureActions.loadRoomByIdProfileFail(error)))
    ))
  ))

  sendMessage$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.sendMessage>(featureActions.ActionTypes.SEND_MESSAGE),
    switchMap(action => this.dataService.sendMessage(action.payload, action.idRoom).pipe(
      tap(action => this.ws.sendMessage(action.respond)),
      map(data => new featureActions.sendMessageSuccess(data.respond)),
      catchError(error => observableOf(new featureActions.sendMessageFail(error)))
    ))
  ))

  createRoom$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.createRoom>(featureActions.ActionTypes.CREATE_ROOM),
    switchMap(action => this.dataService.createRoom(action.payload).pipe(
      tap(action => this.ws.sendMessage({
        ...action.result.message[0],
        participants: action.result.participants.map(x => x._id),
        room: action.result._id,
        type: "text"
        }
      )),
      mergeMap(data => [
        new featureActions.createRoomdSuccess(data.result),
        new AllRoomsStoreActions.addRoom(data.result),
        new CurrentRoomStoreActions.addRoom(data.result)
      ]),
      catchError(error => observableOf(new featureActions.createRoomFail(error)))
    ))
  ))

  deleteRoom$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.deleteRoom>(featureActions.ActionTypes.DELETE_ROOM),
    switchMap(action => this.dataService.DeleteRoom(action.id).pipe(
      map(data => new featureActions.deleteRoomSuccess(data.id)),
      catchError(error => observableOf(new featureActions.deleteRoomFail(error)))
    ))
  ))

  currentRoomMute$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.currentRoomMute>(featureActions.ActionTypes.CURRENT_ROOM_MUTE),
    switchMap(action => this.dataService.MuteRoom(action.id, action.actif).pipe(
      map(data => new featureActions.currentRoomMuteSuccess(data.id, data.message)),
      catchError(error => observableOf(new featureActions.currentRoomMuteFail(error)))
    ))
  ))


  moreMessageInRoom$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.moreMessage>(featureActions.ActionTypes.LOAD_MORE_MESSAGES_BY_ID_ROOM),
    switchMap(action => this.dataService.GetRoomByID(action.id, action.page, action.nbMessage).pipe(
      map(data => new featureActions.moreMessageSuccess(data.result.message)),
      catchError(error => observableOf(new featureActions.moreMessageFail(error)))
    ))
  ))


  loadRoomByIdProfiles$: Observable<ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadRoomByIdProfiles>(featureActions.ActionTypes.LOAD_ROOM_BY_ID_PROFILES),
    switchMap(action => this.dataService.GetRoomByIdProfiles(action.id).pipe(
      map(data => new featureActions.loadRoomByIdProfilesSuccess(data.result, data.message)),
      catchError(error => observableOf(new featureActions.loadRoomByIdProfilesFail(error)))
    ))
  ))


}



