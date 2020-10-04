import { initialState, State, featureAdapter } from './state';
import { Actions, ActionTypes } from './actions';

export function featureReducer (state: State = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SEARCH_PAGE_SUCCESS: {
      return featureAdapter.addAll(action.payload.results, {
        ...state,
        nextPage: action.payload.nextPage,
        prevPage: action.payload.prevPage,
        currentPage: action.payload.currentPage,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.SEARCH_PAGE_START: {
      return featureAdapter.removeAll({
        ...state,
        isLoading: true,
        error: null
      });
    }
    case ActionTypes.SEARCH_PAGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
