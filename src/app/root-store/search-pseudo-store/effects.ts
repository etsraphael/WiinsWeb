import { CoreService } from 'src/app/core/services/core/core.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as featureActions from './actions';

@Injectable()
export class SearchFeatureStoreEffects {
  constructor( private dataPseudo: CoreService, private actions$: Actions ) { }

  searchPseudo$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.SearchPseudo>(featureActions.ActionTypes.SEARCH_PSEUDO),
    switchMap(action => this.dataPseudo.GetPseudoValid(action.q).pipe(
      map(response => new featureActions.SearchPseudoSuccess(response.response)),
      catchError(err => observableOf(new featureActions.SearchPseudoFail(err))),
    )))
  )

}
