import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { MessengerService } from 'src/app/core/services/messenger/messenger.service'
import { WsService } from 'src/app/core/services/ws/ws.service'
import { ActionsMessage } from './actions'
import * as featureActions from './actions'
import { StatePlarformService } from 'src/app/core/statePlarform/state-plarform.service'


@Injectable()
export class CurrentRoomEffects {

  constructor(
    private dataService: MessengerService,
    private ws: WsService,
    private actions$: Actions,
    private plateformState: StatePlarformService
  ) { }

  loadCurrentRooms$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadCurrentRoom>(featureActions.ActionTypes.LOAD_CURRENT_ROOM),
    switchMap(() => this.dataService.GetCurrentRooms().pipe(
      tap(data => this.plateformState.changeState({current_room: data.result.map(x => x._id)})),
      map(data => new featureActions.loadCurrentRoomSuccess(data.result)),
      catchError(error => observableOf(new featureActions.loadCurrentRoomFail(error)))
    ))
  ))

  addCurrentRooms$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.addCurrentRoom>(featureActions.ActionTypes.ADD_CURRENT_ROOM),
    switchMap(action => this.dataService.GetRoomByIDForNotif(action.id).pipe(
      map(data => new featureActions.addCurrentRoomSuccess(data.result)),
      catchError(error => observableOf(new featureActions.addCurrentRoomFail(error)))
    ))
  ))
}
