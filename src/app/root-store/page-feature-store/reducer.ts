import { ActionsPage, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducerPage (state: State = initialState, action: ActionsPage) {
  switch (action.type) {
    case ActionTypes.CREAT_PAGE:
    case ActionTypes.LOAD_PAGE:
    case ActionTypes.CHANGE_VISIBILITY:
    case ActionTypes.DELETE_PAGE: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.CREAT_PAGE_SUCCESS:
    case ActionTypes.LOAD_PAGE_SUCCESS: {
    return {
      ...state,
      page: action.payload,
      isLoading: false,
      error: null
      };
    }
    case ActionTypes.DELETE_PAGE_SUCCESS:  {
      return {
        ...state,
        message: action.message,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.CHANGE_VISIBILITY_SUCCESS:  {
      return {
        ...state,
        page: action.payload,
        message: action.message,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.CREAT_PAGE_FAIL:
    case ActionTypes.LOAD_PAGE_FAIL:
    case ActionTypes.CHANGE_VISIBILITY_FAIL:
    case ActionTypes.DELETE_PAGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.FOLLOW_PAGE:
      case ActionTypes.UNFOLLOW_PAGE: {
        return {
          ...state,
          isLoading: true,
          error: null
        };
      }
      case ActionTypes.FOLLOW_PAGE_SUCCESS: {
        state.page.followed = true
        state.page.followers += 1
        return {
          ...state,
          isLoading: false,
          error: null
        };
      }
      case ActionTypes.UNFOLLOW_PAGE_SUCCESS: {
        state.page.followed = false
        state.page.followers -= 1
        return {
          ...state,
          isLoading: false,
          error: null
        };
      }
      case ActionTypes.FOLLOW_PAGE_FAIL:
      case ActionTypes.UNFOLLOW_PAGE_FAIL: {
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      }
    case ActionTypes.RESET_PAGE:
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

