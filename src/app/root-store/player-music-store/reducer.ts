import { ActionsPlayerMusic, ActionTypes } from './actions'
import { State, initialState } from './state'

export function featureReducerPage (state: State = initialState, action: ActionsPlayerMusic) {
  switch (action.type) {
    case ActionTypes.PLAY: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.PLAY_SUCCESS: {
      return {
        ...state,
        musicIsPlaying: action.musicPlaying,
        musicList: action.musicList,
        musicPlaying: true,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.PAUSE: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.CONTINUE: {
      return {
        ...state,
        musicPlaying: true,
      }
    }
    case ActionTypes.RESET: {
      return {
        ...state,
        musicIsPlaying: null,
        musicList: null,
        musicPlaying: false,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.PAUSE_SUCCESS: {
      return {
        ...state,
        musicPlaying: false,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.NEXT: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.NEXT_SUCCESS: {
      return {
        ...state,
        musicPlaying: true,
        musicIsPlaying: action.musicPlaying,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.NEXT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.PREVIOUS: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.PREVIOUS_SUCCESS: {
      return {
        ...state,
        musicPlaying: true,
        musicIsPlaying: action.musicPlaying,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.UPDATE_MUSIC_LIKE: {
      let musicFound = state.musicList.map(x => x._id).indexOf(action.musicID)
      state.musicList[musicFound].isLiked = true
      return { 
        ...state
      }
    }
    case ActionTypes.UPDATE_MUSIC_DISLIKE: {
      let musicFound = state.musicList.map(x => x._id).indexOf(action.musicID)
      state.musicList[musicFound].isLiked = false
      return { 
        ...state
      }
    }
    case ActionTypes.COMMAND: {
      return {
        ...state,
        command: action.command
      }
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

