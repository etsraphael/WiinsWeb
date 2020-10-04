import { ActionsNotifications, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: ActionsNotifications): State {
  switch (action.type) {
    case ActionTypes.LOAD_NOTIFICATIONS: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_NOTIFICATIONS_SUCCESS: {
      return featureAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.NOTIFICATION_SEEN_SUCCESS: {
      let n = state.entities[action.id]
      n.read = true
      return featureAdapter.updateOne({
        id: action.id,
        changes: n
      }, state);
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}
