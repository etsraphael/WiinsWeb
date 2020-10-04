import { Actions, ActionTypes } from './actions';
import { State, initialState, featureAdapter } from './state';

export function featureReducer (state: State = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SEARCH_PROFILE_SUCCESS:
    case ActionTypes.SEARCH_FRIENDS_SUCCESS: {
      return featureAdapter.addAll(action.payload.results, {
        ...state,
        nextPage: action.payload.nextPage,
        prevPage: action.payload.prevPage,
        currentPage: action.payload.currentPage,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.SEARCH_FRIENDS:
    case ActionTypes.SEARCH_PROFILE: {
      return {
        ...state,
        spot: action.spot
      }
    }
    case ActionTypes.RESET_SEARCH: {
      return featureAdapter.removeAll({
        ...state,
        isLoading: true,
        error: null
      });
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

