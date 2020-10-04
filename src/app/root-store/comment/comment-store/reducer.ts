import { ActionsComment, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsComment): State {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT_SUCCESS: {
      return featureAdapter.addOne(action.payload, state);
    }
    case ActionTypes.PUT_COMMENT_SUCCESS: {
      return featureAdapter.updateOne({ id: action.payload._id, changes: action.payload }, state);
    }
    case ActionTypes.DELETE_COMMENT_SUCCESS: {
      return featureAdapter.removeOne(action.payload._id, state);
    }
    case ActionTypes.UPDATE_COMMENT_LIKE: {
      let comment = state.entities[action.id]
      comment.liked = true
      comment.like += 1
      return featureAdapter.updateOne({ id: action.id, changes: comment }, state)
    }
    case ActionTypes.UPDATE_COMMENT_DISLIKE: {
      let comment = state.entities[action.id]
      comment.liked = false
      comment.like -= 1
      return featureAdapter.updateOne({ id: action.id, changes: comment }, state)
    }
    case ActionTypes.LOAD_COMMENT:
    case ActionTypes.LOAD_COMMENT_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_COMMENT_SUCCESS:
    case ActionTypes.LOAD_COMMENT_PLAYLIST_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.UPGRADE_NUMBER_RESPONSE: {
      return featureAdapter.updateOne({
        id: action.payload._id,
        changes: {
          ...action.payload,
          response: action.payload.response + 1,
        }
      }, state);
    }
    case ActionTypes.RESET_COMMENT:
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
