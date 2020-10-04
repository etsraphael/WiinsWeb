import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { StateProfile, StateProfilePage } from './state';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { PageModel } from 'src/app/core/models/page/page.model';

export const getError = (state: StateProfile): any => state.error;

export const getIsLoading = (state: StateProfile): boolean => state.isLoading;

export const getProfile = (state: StateProfile): ProfileModel => state.profile;

export const getMyAdminGroup = (state: StateProfile): string[] => state.profile.adminsGroup;

export const getMyAdminPage = (state: StateProfile): PageModel[] => state.profile.adminsPage;

export const getProfilePage = (state: StateProfilePage): ProfileModel => state.profile;

export const selectProfileFeatureState: MemoizedSelector<
  object,
  StateProfile
> = createFeatureSelector<StateProfile>('profileFeature');

export const selectProfilePageFeatureState: MemoizedSelector<
  object,
  StateProfilePage
> = createFeatureSelector<StateProfilePage>('profilePageFeature');

export const selectProfile = createSelector(selectProfileFeatureState, getProfile)
export const selectProfilePage = createSelector(selectProfilePageFeatureState, getProfilePage)
export const selectError = createSelector(selectProfileFeatureState, getError)
export const selectIsLoading = createSelector(selectProfileFeatureState, getIsLoading)
export const selectMyAdminGroup = createSelector(selectProfileFeatureState, getMyAdminGroup)
export const selectMyAdminPage = createSelector(selectProfileFeatureState, getMyAdminPage)