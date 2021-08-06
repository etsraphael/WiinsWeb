import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { FeedService } from 'src/app/core/services/publications/feed/feed.service';
import * as featureActions from './actions';
import { ActionsFeedPublication } from './actions';

@Injectable()
export class FeedPublicationByIdStoreEffects {
  constructor(private dataService: FeedService, private actions$: Actions) { }

  loadFeedPublication$: Observable<ActionsFeedPublication> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadFeedPublicationById>(featureActions.ActionTypes.LOAD_FEED_PUBLICATION_BY_ID),
    switchMap(action => this.dataService.getFeedPublicationByID(action.id).pipe(
      map(items => new featureActions.LoadFeedPublicationByIdSuccess(items.publication)),
      catchError(error => observableOf(new featureActions.LoadFeedPublicationByIdFail(error)))
    ))
  ));
}


