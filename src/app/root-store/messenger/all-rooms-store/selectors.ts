import {createFeatureSelector,  createSelector,  MemoizedSelector} from '@ngrx/store'
import { featureAdapter, State } from './state'
import { Room } from 'src/app/core/models/messenger/room.model'

export const getError = (state: State): string => state.error

export const getIsLoading = (state: State): boolean => state.isLoading

export const selectState: MemoizedSelector<object,State>
 = createFeatureSelector<State>('allRooms')

export const selectAllRooms: ( state: object) => Room[]
 = featureAdapter.getSelectors(selectState).selectAll

export const selectError: MemoizedSelector<object, any>
 = createSelector(selectState, getError)

export const selectIsLoading: MemoizedSelector<object, boolean>
 = createSelector(selectState, getIsLoading)
