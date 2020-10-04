import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { Room } from 'src/app/core/models/messenger/room.model'
import { State } from './state'

export const getError = (state: State): string => state.error

export const getIsLoading = (state: State): boolean => state.isLoading

export const getRoom = (state: State): Room => state.room

export const getInfoRoom = (state: State): string => state.infoRoom

export const selectState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('roomById')

export const select: MemoizedSelector<object, any>
 = createSelector( selectState, getRoom )

 export const selectInFo: MemoizedSelector<object, any>
 = createSelector( selectState, getInfoRoom )

export const selectError: MemoizedSelector<object, any>
  = createSelector(selectState, getError)

export const selectIsLoading: MemoizedSelector<object, boolean>
  = createSelector(selectState, getIsLoading)
