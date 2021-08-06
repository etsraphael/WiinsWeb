import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { MessengerService } from 'src/app/core/services/messenger/messenger.service'
import { WsService } from 'src/app/core/services/ws/ws.service'
import { ActionsMessage } from './actions'
import * as featureActions from './actions'
import { AllRoomsStoreActions } from '../all-rooms-store'
import { Action } from '@ngrx/store'
import { CurrentRoomStoreActions } from '../current-room-store'



@Injectable()
export class FullRoomByIdStoreEffects {

  constructor(
    private dataService: MessengerService,
    private ws: WsService,
    private actions$: Actions) { }

  loadRoomByID$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadRoomById>(featureActions.ActionTypes.LOAD_ROOM_BY_ID),
    switchMap(action => this.dataService.GetRoomByID(action.id, action.page, action.nbMessage).pipe(
      mergeMap(data => {
        return [
          new featureActions.loadRoomByIdSuccess(data.result),
          new AllRoomsStoreActions.resetNotification(data.result._id),
          new CurrentRoomStoreActions.resetNotification(data.result._id)
        ]
      }),
      catchError(error => observableOf(new featureActions.loadRoomByIdFail(error)))
    ))
  ))


  loadRoomByIdProfile$: Observable<ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadRoomByIdProfile>(featureActions.ActionTypes.LOAD_ROOM_BY_ID_PROFILE),
    switchMap(action => this.dataService.GetRoomByIdProfile(action.profile._id).pipe(
      map(data => {
        if(data.result == null){ return new featureActions.keepState }
        else { return new featureActions.loadRoomByIdProfileSuccess(data.result) }
      }
      ),
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
      mergeMap(data => [
        new featureActions.createRoomdSuccess(data.result),
        new AllRoomsStoreActions.addRoom(data.result),
        new CurrentRoomStoreActions.addRoom(data.result)
      ]),
      catchError(error => observableOf(new featureActions.createRoomFail(error)))
    ))
  ))

  moreMessageInRoom$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.moreMessage>(featureActions.ActionTypes.LOAD_MORE_MESSAGES_BY_ID_ROOM),
    switchMap(action => this.dataService.GetRoomByID(action.id, action.page, action.nbMessage).pipe(
      map(data => new featureActions.moreMessageSuccess(data.result.message)),
      catchError(error => observableOf(new featureActions.moreMessageFail(error)))
    ))
  ))

  deleteRoom$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.deleteRoom>(featureActions.ActionTypes.DELETE_ROOM),
    switchMap(action => this.dataService.DeleteRoom(action.id).pipe(
      mergeMap(data =>[
        new featureActions.deleteRoomSuccess(data.id),
        new AllRoomsStoreActions.deleteRoom(data.id),
        new CurrentRoomStoreActions.DeleteRoom(data.id)
      ]),
      catchError(error => observableOf(new featureActions.deleteRoomFail(error)))
    ))
  ))

  deleteMessage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.deleteMessage>(featureActions.ActionTypes.DELETE_MESSAGE),
    switchMap(action => this.dataService.DeleteMessage(action.roomID, action.messageID).pipe(
      map(data => new featureActions.deleteMessageSuccess(data.id)),
      catchError(error => observableOf(new featureActions.deleteMessageFail(error)))
    ))
  ))

  roomMute$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.roomMute>(featureActions.ActionTypes.ROOM_MUTE),
    switchMap(action => this.dataService.MuteRoom(action.id, action.actif).pipe(
      map(data => new featureActions.roomMuteSuccess(data.id, data.message)),
      catchError(error => observableOf(new featureActions.roomMuteFail(error)))
    ))
  ))

  loadRoomByIdProfiles$: Observable<ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadRoomByIdProfiles>(featureActions.ActionTypes.LOAD_ROOM_BY_ID_PROFILES),
    switchMap(action => this.dataService.GetRoomByIdProfiles(action.profile.map(x => x._id)).pipe(
      map(data => {
       if(data.message == 'group-not-found'){ return new featureActions.keepState }
       else { return new featureActions.loadRoomByIdProfilesSuccess(data.result, data.message) }
      }),
      catchError(error => observableOf(new featureActions.loadRoomByIdProfilesFail(error)))
    ))
  ))

}
