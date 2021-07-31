import { SearchService } from '../../core/services/search/search.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf, empty } from 'rxjs';
import { catchError, map, startWith, switchMap, filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as featureActions from './actions';


@Injectable()
export class SearchPageStoreEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions
  ) {}

  searchPageEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.SearchPage>(featureActions.ActionTypes.SEARCH_PAGE),
    switchMap((action: featureActions.SearchPage) => {
      return this.dataService
        .PageByName(action.q, action.page, action.limit)
        .pipe(
          map(
            response =>
              new featureActions.SearchPageSuccess({
                results: response.results,
                nextPage: response.next,
                prevPage: response.prev,
                currentPage: response.currentPage
              })
            ),
          catchError(error =>
            observableOf(new featureActions.SearchPageFail(error))
          )
        );
    })
  ));
}
