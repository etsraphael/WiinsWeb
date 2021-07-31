import { CoreService } from 'src/app/core/services/core/core.service';
import { SearchService } from './../../core/services/search/search.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf, empty } from 'rxjs';
import { catchError, map, startWith, switchMap, filter, mergeMap, withLatestFrom, tap } from 'rxjs/operators';
import * as featureActions from './actions';


@Injectable()
export class SearchFeatureStoreEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions
  ) { }


  searchProfileEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.SearchProfile>(featureActions.ActionTypes.SEARCH_PROFILE),
    switchMap((action: featureActions.SearchProfile) => {
      return this.dataService
        .UserByNameOrPseudo(action.q, action.page, action.limit)
        .pipe(map(
          response =>
            new featureActions.SearchProfileSuccess({
              results: response.results,
              nextPage: response.next,
              prevPage: response.prev,
              currentPage: response.currentPage
            })
        ),
          catchError(error =>
            observableOf(new featureActions.SearchProfileFail(error))
          )
        );
    })
  ))


  searchFriendsEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.SearchFriends>(featureActions.ActionTypes.SEARCH_FRIENDS),
    switchMap((action: featureActions.SearchFriends) => {
      return this.dataService
        .FriendProfile(action.q, action.page, action.limit)
        .pipe(map(
          response =>
            new featureActions.SearchFriendsSuccess({
              results: response.results,
              nextPage: response.next,
              prevPage: response.prev,
              currentPage: response.currentPage
            })
        ),
          catchError(error =>
            observableOf(new featureActions.SearchFriendsFail(error))
          )
        );
    })
  ))

}
