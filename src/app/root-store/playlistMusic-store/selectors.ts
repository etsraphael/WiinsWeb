import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { featureAdapter, State } from './state';
import { Playlist } from 'src/app/core/models/music/playlist.model';
import { MenuPlaylistModel } from 'src/app/core/models/music/menuplaylist.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getMenu = (state: State): MenuPlaylistModel => state.menu;

export const selectPlaylistState: MemoizedSelector<object, State>
= createFeatureSelector<State>('playlistMusic');

export const selectAllPlaylist: ( state: object)
=> Playlist[] = featureAdapter.getSelectors(selectPlaylistState).selectAll;

export const selectMusicProjectError: MemoizedSelector<object, any>
= createSelector(selectPlaylistState, getError);

export const selectMusicProjectIsLoading: MemoizedSelector<object, boolean>
= createSelector(selectPlaylistState, getIsLoading);

export const selectMenu: MemoizedSelector<object, MenuPlaylistModel>
= createSelector(selectPlaylistState, getMenu);
