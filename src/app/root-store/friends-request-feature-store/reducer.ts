import { ActionsFriendRequest, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state: State = initialState, action: ActionsFriendRequest) {
  switch (action.type) {
    case ActionTypes.GET_FRIEND_REQUESTS:
    case ActionTypes.CONFIRM_GROUP_REQUEST:
    case ActionTypes.REFUSE_GROUP_REQUEST:
    case ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.GET_FRIEND_REQUESTS_SUCCESS:
    case ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME_SUCCESS: {
      return featureAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        error: null
      })
    }
    case ActionTypes.FRIEND_REQUEST_FAIL:
    case ActionTypes.CONFIRM_GROUP_REQUEST_FAIL:
    case ActionTypes.REFUSE_GROUP_REQUEST_FAIL:
    case ActionTypes.GET_FRIEND_REQUESTS_FAIL:
    case ActionTypes.LOAD_FRIEND_REQUESTS_TO_ME_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.FRIEND_REQUEST_SUCCESS:
    case ActionTypes.CONFIRM_GROUP_REQUEST_SUCCESS:
    case ActionTypes.REFUSE_GROUP_REQUEST_SUCCESS: {
      return featureAdapter.removeOne(action.payload._id, state)
    }
    case ActionTypes.DELETE_REQUEST_SUCCESS: {
      return featureAdapter.removeOne(action.message, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.DELETE_REQUEST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.message
      };
    }
    case ActionTypes.CONFIRM_FRIEND_REQUEST_SUCCESS: {
      return featureAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.CONFIRM_FRIEND_REQUEST_FAIL: {
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
