import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import * as featureActions from './actions'
import { ActionsFeedPublication } from './actions'
import { TubeService } from 'src/app/core/services/tube/tube.service'

@Injectable()
export class TubeMenuStoreEffects {

  constructor(
    private dataService: TubeService,
    private actions$: Actions
  ) { }

  loadMenu$: Observable<ActionsFeedPublication> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadMenuFeed>(featureActions.ActionTypes.LOAD_MENU),
    switchMap(() => this.dataService.getMenu().pipe(
      map( items => new featureActions.LoadMenuFeedSuccess(items.menu)),
      catchError(error => observableOf(new featureActions.LoadMenuFeedFail(error)))
    )))
  )

}


