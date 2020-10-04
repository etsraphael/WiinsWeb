import { ActionsGroup, ActionTypes } from './actions';
import { initialState, State } from './state';
import { MemberGroupModel } from 'src/app/core/models/group/member-group.model';


export function featureReducerGroup(state: State = initialState, action: ActionsGroup) {
  switch (action.type) {
    case ActionTypes.LOAD_GROUP:
    case ActionTypes.UPDATE_GROUP:
    case ActionTypes.LOAD_MEMBER:
    case ActionTypes.DELETE_MEMBER:
    case ActionTypes.SEND_REQUEST_MEMBER: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_GROUP_SUCCESS:
    case ActionTypes.UPDATE_GROUP_SUCCESS: {
      return {
        ...state,
        group: action.payload,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_GROUP_FAIL: 
    case ActionTypes.UPDATE_GROUP_FAIL:
    case ActionTypes.LOAD_MEMBER_FAIL:
    case ActionTypes.DELETE_MEMBER_FAIL:
    case ActionTypes.SEND_REQUEST_MEMBER_FAIL:
    case ActionTypes.CHANGE_ROLE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case ActionTypes.SEND_REQUEST_MEMBER_SUCCESS: {
      if(typeof state.group.members === 'undefined') state.group.members = []
      state.group.members.push(new MemberGroupModel(action.payload, 'pending'))
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.CHANGE_ROLE_SUCCESS: {
      state.group.admins = action.payload
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.DELETE_MEMBER_SUCCESS: {
      state.group.members = state.group.members.filter(obj => obj.profile._id !== action.payload._id)
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.RESET_MEMBER: {
      state.group.members = undefined
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_MEMBER_SUCCESS: {
      if(typeof state.group.members === 'undefined') state.group.members = []
      state.group.members.push(...action.payload)
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.ADD_ADMIN_SUCCESS: {
      state.group.admins.moderators.push(action.payload)
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

