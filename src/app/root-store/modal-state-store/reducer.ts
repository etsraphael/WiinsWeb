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
    case '@user/log_out' as any: return initialState
    default: return { ...state }
  }
}
