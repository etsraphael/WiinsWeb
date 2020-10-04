import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { featureAdapter, State } from './state';
import { BaseNotification } from 'src/app/core/models/notification/baseNotification.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectNotificationFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('notification');

export const selectAllNotificationFeatureItems: (
  state: object
) => BaseNotification[] = featureAdapter.getSelectors(selectNotificationFeatureState).selectAll;


export const selectError: MemoizedSelector<object, any> = createSelector(
  selectNotificationFeatureState,
  getError
);

export const selectIsLoading: MemoizedSelector<object, boolean>
 = createSelector(selectNotificationFeatureState, getIsLoading);
