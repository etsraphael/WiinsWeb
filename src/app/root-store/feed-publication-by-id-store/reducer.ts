import { ActionsFeedPublication, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsFeedPublication): State {
  switch (action.type) {
    case ActionTypes.LOAD_FEED_PUBLICATION_BY_ID: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_FEED_PUBLICATION_BY_ID_SUCCESS:  {
      return {
        ...state,
        publication: action.payload,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_FEED_PUBLICATION_BY_ID_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.RESET_FEED_PUBLICATION_BY_ID: 
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
