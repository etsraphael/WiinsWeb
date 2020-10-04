import { ActionsUser, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer (state: State = initialState, action: ActionsUser) {
  switch (action.type) {
    case ActionTypes.ADD_USER: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        message: 'registered',
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.ADD_USER_FAIL: {
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
