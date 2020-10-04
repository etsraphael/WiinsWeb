import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { PageModel } from 'src/app/core/models/page/page.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getPage = (state: State): PageModel => state.page;

export const getPageMessage = (state: State): string => state.message;

export const selectPageFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('pageFeature');

export const select = createSelector(
  selectPageFeatureState,
  getPage
);

export const selectMessage = createSelector(
  selectPageFeatureState,
  getPageMessage
);

export const selectError = createSelector(
  selectPageFeatureState,
  getError
);

export const selectIsLoading = createSelector(
  selectPageFeatureState,
  getIsLoading
);
