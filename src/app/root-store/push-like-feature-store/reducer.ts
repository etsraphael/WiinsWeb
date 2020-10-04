import { ActionTypes, ActionsPushLike } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsPushLike): State {
  switch (action.type) {
    case ActionTypes.DELETE_LIKE:
    case ActionTypes.DELETE_LIKE_COMMENT:
    case ActionTypes.ADD_LIKE_COMMENT:
    case ActionTypes.ADD_LIKE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.DELETE_LIKE_SUCCESS:
    case ActionTypes.ADD_LIKE_SUCCESS:
    case ActionTypes.DELETE_LIKE_SUCCESS:
    case ActionTypes.ADD_LIKE_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
