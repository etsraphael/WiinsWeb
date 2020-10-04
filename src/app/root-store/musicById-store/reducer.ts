import { ActionsMusicById, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsMusicById): State {
  switch (action.type) {
    case ActionTypes.LOAD_MUSIC_BY_ID_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_MUSIC_BY_ID_SUCCESS: {
      return {
        ...state,
        music: action.payload,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_MUSIC_BY_ID_FAIL: {
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
