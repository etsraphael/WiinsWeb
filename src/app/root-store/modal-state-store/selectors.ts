import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsSuccess = (state: State): boolean => state.success;


export const selectState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('ModalState');

export const selectSuccess = createSelector(
  selectState,
  getIsSuccess
);

export const selectError = createSelector(
  selectState,
  getError
);

export const selectIsLoading = createSelector(
  selectState,
  getIsLoading
);
