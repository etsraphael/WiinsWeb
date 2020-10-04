import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { featureAdapter, State } from './state'
import { RequestProfile } from 'src/app/core/models/request/request.model'

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectFriendsRequestFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('friendsRequestFeature');

export const selectAllFriendsRequest: (
  state: object
) => RequestProfile[] = featureAdapter.getSelectors(selectFriendsRequestFeatureState).selectAll;

export const selectFriendsRequestById = (id: string) =>
  createSelector(this.selectAllFriendsRequestFeatureItems, (allFriendsRequestFeatures: RequestProfile[]) => {
    if (allFriendsRequestFeatures) {
      return allFriendsRequestFeatures.find(p => p._id === id);
    } else {
      return null;
    }
});

export const selectError: MemoizedSelector<object, any> = createSelector(
  selectFriendsRequestFeatureState,
  getError
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectFriendsRequestFeatureState, getIsLoading);
