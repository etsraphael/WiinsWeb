import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';

import * as featureActions from './actions';
import { ActionsResponse } from './actions';
import { CommentService } from 'src/app/core/services/publications/comment/comment.service';

@Injectable()
export class ResponseFeatureStoreEffects {
  constructor(private dataService: CommentService, private actions$: Actions) { }

    getResponse$: Observable<ActionsResponse> = createEffect(() => this.actions$.pipe(
      ofType<featureActions.LoadResponseById>(featureActions.ActionTypes.LOAD_RESPONSE),
      switchMap(action => this.dataService.GetResponseById(action.page, action.id).pipe(
        map(response => new featureActions.LoadResponseByIdSuccess(response.results)),
        catchError(error => observableOf(new featureActions.LoadResponseByIdFail(error)))
      ))
    ));

    getResponsePlaylist$: Observable<ActionsResponse> = createEffect(() => this.actions$.pipe(
      ofType<featureActions.LoadResponsePlaylist>(featureActions.ActionTypes.LOAD_RESPONSE_PLAYLIST),
      switchMap(action => this.dataService.GetResponseByIdPlaylist(action.page, action.id).pipe(
        map(response => new featureActions.LoadResponsePlaylistSuccess(response.results)),
        catchError(error => observableOf(new featureActions.LoadResponsePlaylistFail(error)))
      ))
    ));

    creatResponse$: Observable<ActionsResponse> = createEffect(() => this.actions$.pipe(
      ofType<featureActions.AddResponse>(featureActions.ActionTypes.ADD_RESPONSE),
      switchMap(action => this.dataService.PostResponse(action.payload).pipe(
        map(response => new featureActions.AddResponseSuccess(response.comment)),
        catchError(error => observableOf(new featureActions.AddResponseFail(error)))
      ))
    ));
}
