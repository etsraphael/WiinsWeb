import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getPseudo = (state: State): boolean => state.response;

export const selectPseudoState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('searchPseudo');

export const select = createSelector(
  selectPseudoState,
  getPseudo
);

export const selectError = createSelector(
  selectPseudoState,
  getError
);

export const selectIsLoading = createSelector(
  selectPseudoState,
  getIsLoading
);
