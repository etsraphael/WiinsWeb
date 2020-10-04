import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { State } from './state'
import { GroupModel } from 'src/app/core/models/group/group.model'
import { MemberGroupModel } from 'src/app/core/models/group/member-group.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getGroup = (state: State): GroupModel => state.group;

export const getMembers = (state: State): MemberGroupModel[] => state.group.members;

export const selectState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('one-group');

export const selectError: MemoizedSelector<object, any>
  = createSelector(selectState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean>
  = createSelector(selectState, getIsLoading);

export const select: MemoizedSelector<object, GroupModel>
  = createSelector(selectState, getGroup);

  export const selectMembers: MemoizedSelector<object, MemberGroupModel[]>
  = createSelector(selectState, getMembers);