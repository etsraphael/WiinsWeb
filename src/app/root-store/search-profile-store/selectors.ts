import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { featureAdapter, State } from './state';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getSpot = (state: State): string => state.spot;

export const selectSearchState = createFeatureSelector<State>('searchProfile');

export const selectSearchResults: (state: object) => ProfileModel[]
 = featureAdapter.getSelectors(selectSearchState).selectAll;

export const selectSpot = createSelector( selectSearchState, getSpot);

export const selectError: MemoizedSelector<object, any>
 = createSelector(selectSearchState, getError);

export const selectIsLoading: MemoizedSelector<object,boolean>
 = createSelector(selectSearchState, getIsLoading);
