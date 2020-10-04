import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PageModel } from 'src/app/core/models/page/page.model';
import { State, featureAdapter } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectSearchState = createFeatureSelector<State>('searchPage');

export const selectSearchResults: (
  state: object
) => PageModel[] = featureAdapter.getSelectors(selectSearchState).selectAll;

export const selectError: MemoizedSelector<object, any> = createSelector(
  selectSearchState,
  getError
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectSearchState, getIsLoading);

