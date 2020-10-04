import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { featureAdapter, State } from './state';
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getSuggestList = (state: State): string[] => state.suggestList;

export const getGroupSelected = (state: State): string[] => state.groupSelected;

export const selectState: MemoizedSelector<object, State>
    = createFeatureSelector<State>('feedPublication');

export const selectAllItems: (state: object)
    => FeedPublication[] = featureAdapter.getSelectors(selectState).selectAll;

export const selectError: MemoizedSelector<object, any>
    = createSelector(selectState, getError);

export const selectLoading: MemoizedSelector<object, boolean>
    = createSelector(selectState, getIsLoading);

export const selectSuggestList: MemoizedSelector<object, string[]>
    = createSelector(selectState, getSuggestList);

export const selectGroupSelected: MemoizedSelector<object, string[]>
    = createSelector(selectState, getGroupSelected);
