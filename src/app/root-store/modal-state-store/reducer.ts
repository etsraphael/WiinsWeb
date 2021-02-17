import { ActionsModalState, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer(state: State = initialState, action: ActionsModalState) {
  switch (action.type) {
    case ActionTypes.START_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.END_LOADING: {
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.SHOW_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null
      }
    }
    case ActionTypes.SHOW_ERROR: {
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.error
      }
    }
    case ActionTypes.RESET_MODAL_STATE:
    case '@user/log_out' as any: return initialState
    default: return { ...state }
  }
}
