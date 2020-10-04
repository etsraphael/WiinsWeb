import { AdminPage } from './../../core/models/page/admin.model';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getAdmins = (state: State): AdminPage => state.admins;

export const selectAdminsFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('adminsFeature');

export const select = createSelector(
  selectAdminsFeatureState,
  getAdmins
);

export const selectError = createSelector(
  selectAdminsFeatureState,
  getError
);

export const selectIsLoading = createSelector(
  selectAdminsFeatureState,
  getIsLoading
);
