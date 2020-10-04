import { ActionsPlaylist, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsPlaylist): State {
  switch (action.type) {
    case ActionTypes.LOAD_PLAYLIST:
    case ActionTypes.LOAD_MENU: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_PLAYLIST_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        playlist: state.entities,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_MENU_SUCCESS: {
      return {
        ...state,
        menu: action.payload,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_MENU_FAIL:
    case ActionTypes.LOAD_PLAYLIST_FAIL: {
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
