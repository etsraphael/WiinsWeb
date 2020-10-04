import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { Playlist } from 'src/app/core/models/music/playlist.model';
import { Music } from 'src/app/core/models/publication/music/music.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getPlaylist = (state: State): Playlist => state.playlist;

export const selectPlaylistState: MemoizedSelector<object, State>
= createFeatureSelector<State>('playlistMusicById');

export const select: MemoizedSelector<object, any>
= createSelector(selectPlaylistState, getPlaylist);

export const selectMusicProjectError: MemoizedSelector<object, any>
= createSelector(selectPlaylistState, getError);

export const selectMusicProjectIsLoading: MemoizedSelector<object, boolean>
= createSelector(selectPlaylistState, getIsLoading);
