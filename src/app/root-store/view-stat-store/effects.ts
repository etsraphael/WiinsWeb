import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as featureActions from './actions'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { ActionsViews } from './actions'
import { ViewStatService } from 'src/app/core/services/view-stat/view-stat.service'

@Injectable()
export class ViewStatEffects {
  constructor(
    private dataService: ViewStatService,
    private actions$: Actions
  ) { }


  viewPage$: Observable<ActionsViews> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ViewPage>(featureActions.ActionTypes.VIEW_PAGE),
    switchMap(action => this.dataService.viewPage(action.id).pipe(
      map(items => new featureActions.ViewPageSuccess(items.status)),
      catchError(error => observableOf(new featureActions.ViewPageFail(error)))
    )))
  );

}
