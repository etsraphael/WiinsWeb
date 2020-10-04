import { ActionsProfileList, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsProfileList): State {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_LIST:
    case ActionTypes.GET_LIKED_LIST: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.GET_PROFILE_LIST_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
        error: null
      })
    }
    case ActionTypes.GET_PROFILE_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.RESET_PROFILE_LIST:
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
