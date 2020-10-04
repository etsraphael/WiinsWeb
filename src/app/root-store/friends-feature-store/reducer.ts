import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer (state: State = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_FRIENDS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.GET_PROFILE_FRIENDS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.GET_PROFILE_FRIENDS_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
