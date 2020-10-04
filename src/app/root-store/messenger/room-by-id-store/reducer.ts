import { ActionsMessage, ActionTypes } from './actions';
import { initialState, State } from './state';

export function Reducer(state: State = initialState, action: ActionsMessage) {
  switch (action.type) {
    case ActionTypes.LOAD_ROOM_BY_ID:
    case ActionTypes.CURRENT_ROOM_MUTE: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_ROOM_BY_ID_SUCCESS:
    case ActionTypes.CREATE_ROOM_SUCCESS:
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILE_SUCCESS:{
      return {
        ...state,
        room: action.payload,
        infoRoom: 'found',
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILES_SUCCESS : {
      if(action.payload) {
        return {
          ...state,
          room: action.payload,
          infoRoom: 'group-found',
          isLoading: false,
          error: null
        }
      } else {
        return {
          ...state,
          infoRoom: action.message,
          isLoading: false,
          error: null
        }
      }
    }
    case ActionTypes.CREATE_ROOM:
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILE:
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILES: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.SEND_MESSAGE_SUCCESS: {
      state.room.nbMessage = state.room.nbMessage + 1
      state.room.message.push(action.payload)
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_MORE_MESSAGES_BY_ID_ROOM_SUCCESS: {
      state.room.message = [...action.payload, ...state.room.message]
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.RECEIVE_MESSAGE: {
      state.room.nbMessage = state.room.nbMessage + 1
      state.room.message.push(action.payload)
      return state
    }
    case ActionTypes.RESET_ROOM: {
      state = undefined
      return
    }
    case ActionTypes.CURRENT_ROOM_MUTE_SUCCESS: {
      if(action.message == 'inactif'){
        state.room.roomOption.participants[0].mute = false
      } else { state.room.roomOption.participants[0].mute = true }
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.CURRENT_ROOM_MUTE_FAIL:
    case ActionTypes.DELETE_ROOM_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.CREATE_GROUP_ROOM_DESIGN: {
      let newRoom = {
        participants: [...state.room.participants, ...action.payload.participants],
        roomOption: {participants: [{mute: false}]}
      }
      return {
        room: newRoom,
        infoRoom: 'creation-group',
        isLoading: false,
        error: null
      }
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

