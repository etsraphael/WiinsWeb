import { PageTubeActions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: PageTubeActions): State {
  switch (action.type) {
    case ActionTypes.LOAD_TUBE_PAGE: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_TUBE_PAGE_SUCCESS: {
      return {
        ...state,
        page: action.payload,
        isLoading: false,
        error: null
      }  
    }
    case ActionTypes.LOAD_TUBE_PAGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }    
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
