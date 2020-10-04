import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import * as featureActions from './actions'
import { ActionsFeedPublication } from './actions'
import { FeedService } from 'src/app/core/services/publications/feed/feed.service'

@Injectable()
export class FeedPublicationStoreEffects {

  constructor(
    private dataService: FeedService,
    private actions$: Actions
  ) { }

  @Effect()
  createPublication: Observable<ActionsFeedPublication> = this.actions$.pipe(
    ofType<featureActions.AddFeedPublication>(featureActions.ActionTypes.ADD_FEED_PUBLICATION),
    switchMap(action => this.dataService.newPublication(action.payload).pipe(
      map(items => {
        window.location.reload()
        return new featureActions.AddFeedPublicationSuccess(items.publication)
      }),
      catchError(error => observableOf(new featureActions.AddFeedPublicationFail(error)))
    ))
  )

  @Effect()
  deletePublication: Observable<ActionsFeedPublication> = this.actions$.pipe(
    ofType<featureActions.RemoveFeedPublication>(featureActions.ActionTypes.REMOVE_FEED_PUBLICATION),
    switchMap(action => this.dataService.deleteFeedPublication(action.id).pipe(
      map(items => new featureActions.RemoveFeedPublicationSuccess(items.publication)),
      catchError(error => observableOf(new featureActions.RemoveFeedPublicationFail(error)))
    ))
  )

  @Effect()
  loadPublicationSubscribe: Observable<ActionsFeedPublication> = this.actions$.pipe(
    ofType<featureActions.LoadFeedPublication>(featureActions.ActionTypes.LOAD_FEED_PUBLICATION),
    switchMap(action => this.dataService.getFeedPublication(action.page, action.link).pipe(
      map( items => new featureActions.LoadFeedPublicationSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadFeedPublicationFail(error)))
    ))
  )

  @Effect()
  loadSuggestHastag: Observable<ActionsFeedPublication> = this.actions$.pipe(
    ofType<featureActions.LoadSuggestHastag>(featureActions.ActionTypes.LOAD_SUGGEST_HASTAG),
    switchMap(() => this.dataService.LoadSuggestHastag().pipe(
      map( items => new featureActions.LoadSuggestHastagSuccess(items.hastags)),
      catchError(error => observableOf(new featureActions.LoadSuggestHastagFail(error)))
    ))
  )

  @Effect()
  loadPublicationByGroupID: Observable<ActionsFeedPublication> = this.actions$.pipe(
    ofType<featureActions.LoadFeedPublicationByGroupID>(featureActions.ActionTypes.LOAD_FEED_PUBLICATION_GROUP_ID),
    switchMap(action => this.dataService.getFeedPublicationByGroupsID(action.page, action.groups).pipe(
      map( items => new featureActions.LoadFeedPublicationSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadFeedPublicationFail(error)))
    ))
  )


}


