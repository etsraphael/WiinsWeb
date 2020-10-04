import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { State } from './state'
import { Room } from 'src/app/core/models/messenger/room.model'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'

export const getError = (state: State): string => state.error

export const getIsLoading = (state: State): boolean => state.isLoading

export const getRoom = (state: State): Room => state.room;

export const getParticipant = (state: State): ProfileModel[] => state.room.participants

export const selectState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('fullRoomById')

export const select: MemoizedSelector<object, any> = createSelector(
  selectState,
  getRoom
)

export const selectParticipant = createSelector(
  selectState,
  getParticipant
)

export const selectError: MemoizedSelector<object, any>
  = createSelector(selectState, getError)

export const selectIsLoading: MemoizedSelector<object, boolean>
  = createSelector(selectState, getIsLoading)
