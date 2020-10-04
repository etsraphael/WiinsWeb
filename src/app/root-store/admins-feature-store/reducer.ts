import { ActionsPage, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer(state: State = initialState, action: ActionsPage) {
  switch (action.type) {
    case ActionTypes.LOAD_ADMINS:
    case ActionTypes.CHANGE_ROLE: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_ADMINS_SUCCESS:
    case ActionTypes.CHANGE_ROLE_SUCCESS: {
      return {
        ...state,
        admins: action.payload,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_ADMINS_FAIL:
    case ActionTypes.CHANGE_ROLE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
