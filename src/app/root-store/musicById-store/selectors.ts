import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { Music } from 'src/app/core/models/publication/music/music.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getMusic = (state: State): Music => state.music;

export const selectMusicProjectState: MemoizedSelector<object, State>
 = createFeatureSelector<State>('musicById');

 export const select: MemoizedSelector<object, any>
 = createSelector( selectMusicProjectState, getMusic);

export const selectMusicProjectError: MemoizedSelector<object, any>
 = createSelector( selectMusicProjectState, getError);

export const selectMusicProjectIsLoading: MemoizedSelector<object, boolean>
 = createSelector(selectMusicProjectState, getIsLoading);
