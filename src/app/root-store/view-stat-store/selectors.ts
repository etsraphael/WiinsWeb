import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const selectViewState: MemoizedSelector<object,State>
 = createFeatureSelector<State>('viewStat');

