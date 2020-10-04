import { ActionsPlaylist, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsPlaylist): State {
  switch (action.type) {
    case ActionTypes.LOAD_PLAYLISTS: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_PLAYLISTS_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        playlist: state.entities,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_PLAYLISTS_FAIL: {
        return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.RESET_PLAYLISTS: {
      return featureAdapter.removeAll({
        ...state,
        isLoading: false,
        error: null
      });
  }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
