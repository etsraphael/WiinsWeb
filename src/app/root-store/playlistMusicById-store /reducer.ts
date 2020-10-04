import { ActionsPlaylistById, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsPlaylistById): State {
  switch (action.type) {
    case ActionTypes.LOAD_PLAYLIST_BY_ID:
    case ActionTypes.CREATE_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_PLAYLIST_BY_ID_SUCCESS:
    case ActionTypes.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlist: action.payload,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_PLAYLIST_BY_ID_FAIL:
    case ActionTypes.CREATE_PLAYLIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.UPDATE_MUSIC_LIKE: {
      let musicFound = state.playlist.musicList.indexOf(action.payload)
      state.playlist.musicList[musicFound].isLiked = true
      return { 
        ...state
      }
    }
    case ActionTypes.UPDATE_MUSIC_DISLIKE: {
      let musicFound = state.playlist.musicList.indexOf(action.payload)
      state.playlist.musicList[musicFound].isLiked = false
      return { 
        ...state
      }
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
