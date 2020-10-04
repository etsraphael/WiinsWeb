import { ActionsPseudo, ActionTypes } from './actions'
import { State, initialState  } from './state'

export function featureReducer (state: State = initialState, action: ActionsPseudo) {
  switch (action.type) {
    case ActionTypes.SEARCH_PSEUDO: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.SEARCH_PSEUDO_SUCCESS: {
      return {
        ...state,
        response: action.response,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.SEARCH_PSEUDO_FAIL: {
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

