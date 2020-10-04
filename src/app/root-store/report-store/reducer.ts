import { ActionsReport, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducerPage (state: State = initialState, action: ActionsReport) {
  switch (action.type) {
    case ActionTypes.REPORT_SUCCESS:{
    return {
      ...state,
      message: action.message,
      isLoading: false,
      error: null
      };
    }
    case ActionTypes.REPORT_FAIL: {
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

