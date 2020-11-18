import { CommentModel } from 'src/app/core/models/comment/comment.model';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { featureAdapter, State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectCommentFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('Comment');

export const selectAllCommentFeatureItems: (
  state: object
) => CommentModel[] = featureAdapter.getSelectors(selectCommentFeatureState).selectAll;

export const selectCommentFeatureError: MemoizedSelector<object, any> = createSelector(
  selectCommentFeatureState,
  getError
);

export const selectCommentFeatureIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectCommentFeatureState, getIsLoading);
