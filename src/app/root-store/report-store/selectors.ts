import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getMessage = (state: State): string => state.message;

export const selectPageFeatureState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('report');

export const selectMessage = createSelector(
  selectPageFeatureState,
  getMessage
);

export const selectError = createSelector(
  selectPageFeatureState,
  getError
);

export const selectIsLoading = createSelector(
  selectPageFeatureState,
  getIsLoading
);
