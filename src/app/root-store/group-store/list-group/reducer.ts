import { ActionsGroup, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';


export function featureReducerGroup(state: State = initialState, action: ActionsGroup) {
  switch (action.type) {
    case ActionTypes.CREAT_GROUP:
    case ActionTypes.LOAD_MY_GROUPS: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.CREAT_GROUP_SUCCESS:  {
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_MY_GROUPS_SUCCESS:  {
      return featureAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
        error: null
      })
    }
    case ActionTypes.CREAT_GROUP_FAIL:
    case ActionTypes.LOAD_MY_GROUPS_FAIL:
    case ActionTypes.LEAVE_GROUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.LEAVE_GROUP_SUCCESS: {
      return featureAdapter.removeOne(action.id, {
        ...state,
        isLoading: false,
        error: null
      })
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

