import { ActionsSetting, ActionTypes } from './actions';
import { State, initialState } from './state';

export function featureReducer (state: State = initialState, action: ActionsSetting) {
  switch (action.type) {
    case ActionTypes.LOAD_SETTING_VISIBILITY_START:
    case ActionTypes.CHANGE_VISIBILITY_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_SETTING_VISIBILITY_SUCCESS:
    case ActionTypes.CHANGE_VISIBILITY_SUCCESS: {
      return {
        ...state,
        setting: action.setting_visibility,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_SETTING_VISIBILITY_FAIL:
    case ActionTypes.CHANGE_VISIBILITY_FAIL: {
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
