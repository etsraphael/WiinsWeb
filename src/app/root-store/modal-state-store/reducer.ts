import { ActionsModalState, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer(state: State = initialState, action: ActionsModalState) {
  switch (action.type) {
    case '@music_project/delete' as any:
    case ActionTypes.START_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: false
      }
    }
    case ActionTypes.END_LOADING: {
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case '@music_project/delete_success' as any:
    case ActionTypes.SHOW_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false
      }
    }
    case '@music_project/delete_fail' as any:
    case ActionTypes.SHOW_ERROR: {
      return {
        ...state,
        isLoading: false,
        success: false,
        error: true
      }
    }
    case ActionTypes.RESET_MODAL_STATE:
    case '@user/log_out' as any: return initialState
    default: return { ...state }
  }
}
