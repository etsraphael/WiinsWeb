import { TubeFeedActions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: TubeFeedActions): State {
  switch (action.type) {
    case ActionTypes.LOAD_TUBE_FEED:
    case ActionTypes.ADD_TUBE_FEED: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.ADD_TUBE_FEED_SUCCESS: {
      return featureAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
        error: null
      }); 
    }
    case ActionTypes.LOAD_TUBE_FEED_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
        error: null
      }); 
    }
    case ActionTypes.DELETE_TUBE_FEED_SUCCESS: {
      return featureAdapter.removeOne(action.id, {
        ...state,
        isLoading: false,
        error: null
      }); 
    }
    case ActionTypes.LOAD_TUBE_FEED_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }    
    }
    case ActionTypes.ADD_TUBE_FEED_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }    
    }
    case ActionTypes.RESET_TUBE_FEED:
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
