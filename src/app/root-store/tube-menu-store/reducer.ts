import { ActionsFeedPublication, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsFeedPublication): State {
  switch (action.type) {
    case ActionTypes.LOAD_MENU: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_MENU_SUCCESS: {
      return {
        ...state,
        menu: action.payload,
        isLoading: false,
        error: null
      }  
    }
    case ActionTypes.LOAD_MENU_FAIL: {
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
