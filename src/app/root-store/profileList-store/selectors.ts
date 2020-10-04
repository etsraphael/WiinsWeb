import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { featureAdapter, State } from './state';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { PageModel } from 'src/app/core/models/page/page.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectState: MemoizedSelector<object, State>
    = createFeatureSelector<State>('ProfileList');

export const selectAllItems: (state: object)
    => (any[]|ProfileModel[]|PageModel[]) = featureAdapter.getSelectors(selectState).selectAll;

export const selectError: MemoizedSelector<object, any>
    = createSelector(selectState, getError);

export const selectLoading: MemoizedSelector<object, boolean>
    = createSelector(selectState, getIsLoading);
