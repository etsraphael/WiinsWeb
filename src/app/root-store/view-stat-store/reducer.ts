import { ActionsViews, ActionTypes } from './actions';
import { State, initialState } from './state';

export function ReducerPageViewStat (state: State = initialState, action: ActionsViews) {
  switch (action.type) {
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

