import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';
import { TubePageModel } from 'src/app/core/models/tube/tubePage.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getPage = (state: State): TubePageModel => state.page;

export const selectPublicationState: MemoizedSelector<object, State>
    = createFeatureSelector<State>('TubePage');

export const select = createSelector(selectPublicationState, getPage)

export const selectError = createSelector(selectPublicationState, getError)

export const selectIsLoading = createSelector(selectPublicationState, getIsLoading)
