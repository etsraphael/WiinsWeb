import { ActionsPassword, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer (state: State = initialState, action: ActionsPassword) {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        message: action.message,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.CHANGE_PASSWORD_FAIL: {
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
