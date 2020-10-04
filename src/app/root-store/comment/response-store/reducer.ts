import { ActionsResponse, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsResponse): State {
  switch (action.type) {
    case ActionTypes.ADD_RESPONSE: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.ADD_RESPONSE_SUCCESS: {
      return featureAdapter.addOne(action.payload, state);
    }
    case ActionTypes.LOAD_RESPONSE:
    case ActionTypes.LOAD_RESPONSE_PLAYLIST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ActionTypes.LOAD_RESPONSE_SUCCESS:
    case ActionTypes.LOAD_RESPONSE_PLAYLIST_SUCCESS: {
      return featureAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.UPDATE_RESPONSE_LIKE: {
      let comment = state.entities[action.id]
      comment.liked = true
      comment.like += 1 
      return featureAdapter.updateOne({id: action.id,changes: comment}, state)
    }
    case ActionTypes.UPDATE_RESPONSE_DISLIKE: {
      let comment = state.entities[action.id]
      comment.liked = false
      comment.like -= 1 
      return featureAdapter.updateOne({id: action.id,changes: comment}, state)
    }
    case ActionTypes.RESET_RESPONSE:
      case '@user/log_out' as any: return initialState
      default: return state
  }
}
