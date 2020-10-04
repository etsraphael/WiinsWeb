import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TubeModel } from 'src/app/core/models/tube/tube.model';
import { featureAdapter, State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectState: MemoizedSelector<object, State>
    = createFeatureSelector<State>('TubeFeed');

export const selectAllItems: (state: object)
    => TubeModel[] = featureAdapter.getSelectors(selectState).selectAll;

export const selectError = createSelector(selectState, getError)

export const selectIsLoading = createSelector(selectState, getIsLoading)