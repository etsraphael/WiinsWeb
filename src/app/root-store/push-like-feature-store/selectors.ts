import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { likeModel } from 'src/app/core/models/publication-options/like.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLike = (state: State): likeModel => state.like;

export const selectAllLikeFeatureState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('PushLikeFeature');

export const selectError: MemoizedSelector<object, any>
  = createSelector(selectAllLikeFeatureState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean>
  = createSelector(selectAllLikeFeatureState, getIsLoading);

export const selectAllPushLike
 = createSelector(selectAllLikeFeatureState, getIsLike);
