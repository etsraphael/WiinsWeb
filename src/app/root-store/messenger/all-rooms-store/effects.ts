import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { MessengerService } from 'src/app/core/services/messenger/messenger.service'
import { WsService } from 'src/app/core/services/ws/ws.service'
import * as featureActions from './actions'
import { StatePlarformService } from 'src/app/core/statePlarform/state-plarform.service'


@Injectable()
export class AllRoomsEffects {
  constructor(
    private dataService: MessengerService,
    private ws: WsService,
    private plateformState: StatePlarformService,
    private actions$: Actions
  ) { }

  loadAllRooms$: Observable<featureActions.ActionsMessage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.loadAllRoomsByPage>(featureActions.ActionTypes.LOAD_ALL_ROOMS_BY_PAGE),
    switchMap(action => this.dataService.GetAllRoomsByPage(action.page).pipe(
      tap(data => this.plateformState.changeState({all_rooms: data.results.map(x => x._id)})),
      map(data => new featureActions.loadAllRoomsByPageSuccess(data.results)),
      catchError(error => observableOf(new featureActions.loadAllRoomsByPageFail(error)))
    ))
  ))


}
