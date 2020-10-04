import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getResponsePassword = (state: State): string => state.message;


export const selectPasswordState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('Password');


export const select = createSelector(
  selectPasswordState,
  getResponsePassword
);

export const selectError = createSelector(
  selectPasswordState,
  getError
);

export const selectIsLoading = createSelector(
  selectPasswordState,
  getIsLoading
);
