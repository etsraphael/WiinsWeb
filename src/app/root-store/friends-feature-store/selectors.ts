import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { featureAdapter, State } from './state';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectFriendsFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('friendsFeature');

export const selectAllFriends: (
  state: object
) => ProfileModel[] = featureAdapter.getSelectors(selectFriendsFeatureState).selectAll;

export const selectFriendsFeatureById = (id: string) =>
  createSelector(this.selectAllFriendsFeatureItems, (allFriendsFeatures: ProfileModel[]) => {
    if (allFriendsFeatures) {
      return allFriendsFeatures.find(p => p._id === id);
    } else {
      return null;
    }
  });

export const selectError: MemoizedSelector<object, any> = createSelector(
  selectFriendsFeatureState,
  getError
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectFriendsFeatureState, getIsLoading);
