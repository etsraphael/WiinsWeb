import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { PrivacySetting } from 'src/app/core/models/baseUser/privacySetting.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getSetting = (state: State): PrivacySetting => state.setting;


export const selectSettingState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('PrivacySetting');


export const select = createSelector(
  selectSettingState,
  getSetting
);

export const selectError = createSelector(
  selectSettingState,
  getError
);

export const selectIsLoading = createSelector(
  selectSettingState,
  getIsLoading
);
