import { ActionsMusicProject, ActionTypes } from './actions'
import { featureAdapter, initialState, State } from './state'

export function featureReducer(state = initialState, action: ActionsMusicProject): State {
  switch (action.type) {
    case ActionTypes.ADD_MUSIC_PROJECT:
    case ActionTypes.LOAD_MUSIC_PROJECT_BY_MY_PROFILE:
    case ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.ADD_MUSIC_PROJECT_SUCCESS: {
      return featureAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
      })
    }
    case ActionTypes.LOAD_MUSIC_PROJECT_BY_MY_PROFILE_SUCCESS:
    case ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        publication: state.entities,
        isLoading: false,
        error: null
      })
    }
    case ActionTypes.ADD_MUSIC_PROJECT_FAIL:
    case ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.UPDATE_MUSIC_PROJECT_SUCCESS:
    case ActionTypes.UPDATE_MUSIC_SUCCESS: {
      return featureAdapter.updateOne(
        {
          id: action.payload._id,
          changes: action.payload
        },
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case ActionTypes.DELETE_MUSIC_SUCCESS: {
      return featureAdapter.updateOne({ id: action.payload._id, changes: action.payload },
        {
          ...state,
          categorie: 'valid-password'
        }
      )
    }
    case ActionTypes.DELETE_PLAYLIST_FAIL:
    case ActionTypes.DELETE_MUSIC_FAIL: {
      return {
        ...state,
        error: action.message
      }
    }
    case ActionTypes.DELETE_MUSIC_PROJECT_SUCCESS: {
      return featureAdapter.removeOne(action.id, {
        ...state,
        categorie: 'valid-password'
      })
    }
    case ActionTypes.WRONG_PASSWORD: {
      return {
        ...state,
        error: action.message
      }
    }
    case ActionTypes.DELETE_PLAYLIST_SUCCESS: {
      return featureAdapter.removeOne(action.payload._id, {
        ...state,
      })
    }
    case ActionTypes.UPDATE_MUSIC_LIKE: {
      let musicProject = state.entities[action.musicProjectId]
      musicProject.musicList.filter(x => x == action.payload)[0].isLiked = true
      return featureAdapter.updateOne({
        id: action.musicProjectId,
        changes: musicProject
      }, state)
    }
    case ActionTypes.UPDATE_MUSIC_DISLIKE: {
      let musicProject = state.entities[action.musicProjectId]
      musicProject.musicList.filter(x => x == action.payload)[0].isLiked = false
      return featureAdapter.updateOne({
        id: action.musicProjectId,
        changes: musicProject
      }, state)
    }
    case ActionTypes.DELETE_MUSIC_PROJECT_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case ActionTypes.RESET_MUSIC_PROJECTS:
    case '@user/log_out' as any: return initialState
    default: return {...state}
  }
}
