import { UserModel } from './../../core/models/baseUser/user.model';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getProfile = (state: State): UserModel => state.user;

export const getMessage = (state: State): string => state.message;

export const selectUserState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('User');

export const select = createSelector(selectUserState, getProfile)

export const selectError = createSelector(selectUserState, getError)

export const selectMessage = createSelector(selectUserState, getMessage)

export const selectIsLoading = createSelector(selectUserState, getIsLoading)
