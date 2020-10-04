import { ActionsMyMusic, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsMyMusic): State {
  switch (action.type) {
    case ActionTypes.LOAD_MY_MUSIC: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_MY_MUSIC_SUCCESS: {
      return featureAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_MY_MUSIC_FAIL: {
        return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case ActionTypes.LIKE_MUSIC: {
      return featureAdapter.addOne(action.music, state)
    }

    case ActionTypes.DISLIKE_MUSIC: {
      return featureAdapter.removeOne(action.music._id, state);
    }




    case '@user/log_out' as any: return initialState
    default: return state
  }
}
