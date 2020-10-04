import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { PageTubeActions } from './actions'
import * as featureActions from './actions'
import { TubeService } from 'src/app/core/services/tube/tube.service'

@Injectable()
export class TubePageStoreEffects {

  constructor(
    private dataService: TubeService,
    private actions$: Actions
  ) { }

  @Effect()
  loadMenu: Observable<PageTubeActions> = this.actions$.pipe(
    ofType<featureActions.LoadPageTube>(featureActions.ActionTypes.LOAD_TUBE_PAGE),
    switchMap(action => this.dataService.getTubePage(action.id).pipe(
      map( items => new featureActions.LoadPageTubeSuccess(items.page)),
      catchError(error => observableOf(new featureActions.LoadPageTubeFail(error)))
    ))
  )

}


