import { UserModel } from './../../core/models/baseUser/user.model';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getUser = (state: State): UserModel => state.user;

export const selectUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('myUser');

export const select = createSelector(
  selectUserState,
  getUser
);

export const selectError = createSelector(
  selectUserState,
  getError
);

export const selectIsLoading = createSelector(
  selectUserState,
  getIsLoading
);
