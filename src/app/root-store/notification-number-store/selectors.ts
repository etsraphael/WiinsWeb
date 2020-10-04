import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { StateNumberRequest, StateNumberActivity } from './state';

export const getErrorNumberRequest = (state: StateNumberRequest): any => state.error;

export const getIsLoadingNumberRequest = (state: StateNumberRequest): boolean => state.isLoading;

export const getNotificationNumberRequest = (state: StateNumberRequest): number => state.number;

export const selectNumberRequestState: MemoizedSelector<
  object,
  StateNumberRequest
> = createFeatureSelector<StateNumberRequest>('NumberRequest');

export const getErrorNumberActivity = (state: StateNumberActivity): any => state.error;

export const getIsLoadingNumberActivity = (state: StateNumberActivity): boolean => state.isLoading;

export const getNotificationNumberActivity = (state: StateNumberActivity): number => state.number;

export const selectNumberActivityState: MemoizedSelector<
  object,
  StateNumberActivity
> = createFeatureSelector<StateNumberActivity>('NumberActivity');

export const selectNumberRequest = createSelector(
  selectNumberRequestState,
  getNotificationNumberRequest
);

export const selectErrorNumberRequest = createSelector(
  selectNumberRequestState,
  getErrorNumberRequest
);

export const selectIsLoadingNumberRequest = createSelector(
  selectNumberRequestState,
  getIsLoadingNumberRequest
);


export const selectNumberActivity = createSelector(
  selectNumberActivityState,
  getNotificationNumberActivity
);

export const selectErrorNumberActivity = createSelector(
  selectNumberActivityState,
  getErrorNumberActivity
);

export const selectIsLoadingNumberActivity = createSelector(
  selectNumberActivityState,
  getIsLoadingNumberActivity
);
