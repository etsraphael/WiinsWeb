import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'

import { featureAdapter, State } from './state'

export const getError = (state: State): any => state.error

export const getIsLoading = (state: State): boolean => state.isLoading

export const selectMusicProjectState: MemoizedSelector<object, State>
    = createFeatureSelector<State>('musicProject');

export const selectAllMusicProjectItems: (state: object) => MusicProject[]
    = featureAdapter.getSelectors(selectMusicProjectState).selectAll;

export const selectMusicProjectError: MemoizedSelector<object, any>
    = createSelector(selectMusicProjectState, getError);

export const selectMusicProjectIsLoading: MemoizedSelector<object, boolean>
    = createSelector(selectMusicProjectState, getIsLoading);