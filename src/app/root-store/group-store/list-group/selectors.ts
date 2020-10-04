import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State, featureAdapter } from './state';
import { GroupModel } from 'src/app/core/models/group/group.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectGroupState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('group');

export const selectPublicationError: MemoizedSelector<object, any>
  = createSelector(selectGroupState, getError);

export const selectPublicationIsLoading: MemoizedSelector<object, boolean>
  = createSelector(selectGroupState, getIsLoading);

export const selectAllGroupStoryItems: (state: object)
  => GroupModel[] = featureAdapter.getSelectors(selectGroupState).selectAll;
