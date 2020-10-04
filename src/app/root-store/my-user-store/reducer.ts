import { ActionsUser, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer(state: State = initialState, action: ActionsUser) {
  switch (action.type) {
    case ActionTypes.LOAD_USER:
    case ActionTypes.UPDATE_USER:
    case ActionTypes.LOAD_USER_WITH_TOKEN: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        token: action.token,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.UPDATE_USER_SUCCESS:
    case ActionTypes.LOAD_USER_WITH_TOKEN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_USER_FAIL:
    case ActionTypes.UPDATE_USER_FAIL:
    case ActionTypes.LOAD_USER_WITH_TOKEN_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case '@user/log_out': return initialState
    default: return state;
  }
}
