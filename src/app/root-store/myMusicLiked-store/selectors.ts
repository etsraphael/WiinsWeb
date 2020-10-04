import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State, featureAdapter } from './state';
import { Music } from 'src/app/core/models/publication/music/music.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectPlaylistState: MemoizedSelector<object, State>
= createFeatureSelector<State>('myMusicLiked');

export const select: (state: object)
  => Music[] = featureAdapter.getSelectors(selectPlaylistState).selectAll;

export const selectMusicProjectError: MemoizedSelector<object, any>
= createSelector(selectPlaylistState, getError);

export const selectMusicProjectIsLoading: MemoizedSelector<object, boolean>
= createSelector(selectPlaylistState, getIsLoading);
