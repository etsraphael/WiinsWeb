import { CoreService } from '../../core/services/core/core.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import * as featureActions from './actions';

@Injectable()
export class FriendsFeatureStoreEffects {
  constructor(private dataService: CoreService, private actions$: Actions){}

  loadProfileFriends$: Observable<Action> = createEffect(() => this.actions$
  .pipe(
    ofType<featureActions.GetProfileFriends>(featureActions.ActionTypes.GET_PROFILE_FRIENDS),
    // startWith(new featureActions.GetProfileFriendsStart()),
    switchMap((action) => this.dataService.GetFriends()
    .pipe(
      map(response => new featureActions.GetProfileFriendsSuccess(response.results)),
      catchError(err => {
        return observableOf(new featureActions.GetProfileFriendsFail(err));
      })
    ))
  ));
}
