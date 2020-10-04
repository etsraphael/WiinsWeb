import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { TubeMenuModel } from 'src/app/core/models/tube/tubeMenu.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getMenu = (state: State): TubeMenuModel => state.menu;

export const selectPublicationState: MemoizedSelector<object, State>
    = createFeatureSelector<State>('TubeMenu');

export const select = createSelector(selectPublicationState, getMenu)

export const selectError = createSelector(selectPublicationState, getError)

export const selectIsLoading = createSelector(selectPublicationState, getIsLoading)
