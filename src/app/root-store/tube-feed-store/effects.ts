import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError, tap, mergeMap} from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { TubeFeedActions } from './actions'
import * as featureActions from './actions'
import { TubeService, TubeProjectResponse } from 'src/app/core/services/tube/tube.service'
import { Action } from '@ngrx/store'
import { Router } from '@angular/router'
import { ProfileFeatureStoreActions } from '../profile-feature-store'

@Injectable()
export class TubeFeedStoreEffects {

  constructor(
    private dataService: TubeService,
    private actions$: Actions,
    private router: Router
  ) { }

  loadTube$: Observable<TubeFeedActions> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadTubeFeed>(featureActions.ActionTypes.LOAD_TUBE_FEED),
    switchMap(action => this.dataService.getTubeFeed(String(action.page), action.profile).pipe(
      map(item => new featureActions.LoadTubeFeedSuccess(item.results)),
      catchError(error => observableOf(new featureActions.LoadTubeFeedFail(error)))
    )))
  )

  deleteTube$: Observable<TubeFeedActions> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeleteTubeFeed>(featureActions.ActionTypes.DELETE_TUBE_FEED),
    switchMap(action => this.dataService.deleteTubeById(action.id).pipe(
      map(item => new featureActions.DeleteTubeFeedSuccess(item.id)),
      catchError(error => observableOf(new featureActions.DeleteTubeFeedFail(error)))
    )))
  )

  addTube$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.AddTubeFeed>(featureActions.ActionTypes.ADD_TUBE_FEED),
    switchMap(action => this.dataService.createTube(action.payload).pipe(
      tap((action: TubeProjectResponse) => this.router.navigate(['/profile/'+ action.tube.profile._id + '/Tube'])),
      mergeMap((item: TubeProjectResponse) => {
        if (item.actifSpace !== null) {
          return [
            new featureActions.AddTubeFeedSuccess(item.tube),
            new ProfileFeatureStoreActions.udapteActifSpace(item.actifSpace)
          ]
        } else return [new featureActions.AddTubeFeedSuccess(item.tube)]
      }),
      catchError(error => observableOf(new featureActions.AddTubeFeedFail(error)))
    )))
  )

}


