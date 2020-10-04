import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { Music } from 'src/app/core/models/publication/music/music.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getCommand = (state: State): string => state.command;

export const getMusicList = (state: State): Music[] => state.musicList;

export const getIfPlaying = (state: State): boolean => state.musicPlaying;

export const getMusicIsPlaying = (state: State): Music => state.musicIsPlaying;

export const getArtistPlaying = (state: State): string => state.musicIsPlaying.profile._meta.pseudo;

export const selectMusicInPlayerState: MemoizedSelector< object, State>
 = createFeatureSelector<State>('playerMusic')

export const selectCommand = createSelector(
  selectMusicInPlayerState,
  getCommand
);

export const selectMusicList = createSelector(
  selectMusicInPlayerState,
  getMusicList
);

export const selectArtistPlaying = createSelector(
  selectMusicInPlayerState,
  getArtistPlaying
);

export const selectMusicIsPlaying = createSelector(
  selectMusicInPlayerState,
  getMusicIsPlaying
);

export const selectIfPlaying = createSelector(
  selectMusicInPlayerState,
  getIfPlaying
);

export const selectError = createSelector(
  selectMusicInPlayerState,
  getError
);

export const selectIsLoading = createSelector(
  selectMusicInPlayerState,
  getIsLoading
);
