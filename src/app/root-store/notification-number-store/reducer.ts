import { ActionsNumberNotification, ActionTypes } from './actions';
import { StateNumberRequest, initialStateRequest, StateNumberActivity, initialStateActivity } from './state';

export function requestReducer(state: StateNumberRequest = initialStateRequest, action: ActionsNumberNotification) {
  switch (action.type) {
    case ActionTypes.LOAD_NUMBER_REQUEST:
    case ActionTypes.INITIALIZE_NUMBER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_NUMBER_REQUEST_SUCCESS: {
      return {
        ...state,
        number: action.number,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.INITIALIZE_NUMBER_REQUEST_SUCCESS: {
      return {
        ...state,
        seen: action.seen,
        isLoading: false,
        number: 0,
        error: null
      };
    }
    case ActionTypes.LOAD_NUMBER_REQUEST_FAIL:
    case ActionTypes.INITIALIZE_NUMBER_REQUEST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case '@user/log_out' as any: return initialStateRequest
    default: return state
  }
}

export function activityReducer(state: StateNumberActivity = initialStateActivity, action: ActionsNumberNotification) {
  switch (action.type) {
    case ActionTypes.LOAD_NUMBER_ACTIVITY:
    case ActionTypes.INITIALIZE_NUMBER_ACTIVITY: {
        return {
          ...state,
          isLoading: true,
          error: null
        };
    }
    case ActionTypes.LOAD_NUMBER_ACTIVITY_SUCCESS: {
      return {
        ...state,
        number: action.number,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.INITIALIZE_NUMBER_ACTIVITY_SUCCESS: {
      return {
        ...state,
        seen: action.seen,
        number: 0,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_NUMBER_ACTIVITY_FAIL:
    case ActionTypes.INITIALIZE_NUMBER_ACTIVITY_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case '@user/log_out' as any: return initialStateActivity
    default: return state
  }
}
