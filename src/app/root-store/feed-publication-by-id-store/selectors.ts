import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';
import { State } from './state';


export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getPublication = (state: State): FeedPublication=> state.publication;

export const selectPublicationState: MemoizedSelector<object,State>
 = createFeatureSelector<State>('feed-publication-by-id');

export const select = createSelector(
  selectPublicationState,
  getPublication
);

export const selectError = createSelector(
  selectPublicationState,
  getError
);

export const selectIsLoading = createSelector(
  selectPublicationState,
  getIsLoading
);
