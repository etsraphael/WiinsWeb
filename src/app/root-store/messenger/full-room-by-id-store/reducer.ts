import { ActionsMessage, ActionTypes } from './actions';
import { initialState, State } from './state';

export function Reducer(state: State = initialState, action: ActionsMessage) {
  switch (action.type) {
    case ActionTypes.LOAD_ROOM_BY_ID: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILES: {
      let newRoom = {
        participants: [...action.profile],
        roomOption: {participants: [{mute: false}]}
      }
      return {
        room: newRoom,
        infoRoom: 'creation-group',
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_ROOM_BY_ID_SUCCESS:
    case ActionTypes.CREATE_ROOM_SUCCESS:
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILE_SUCCESS:
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILES_SUCCESS:{
      return {
        ...state,
        room: action.payload,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.SEND_MESSAGE:
    case ActionTypes.CREATE_ROOM: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.ROOM_MUTE_SUCCESS: {
      if(action.message == 'inactif'){
        state.room.roomOption.participants[0].mute = false
      } else { state.room.roomOption.participants[0].mute = true }
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_ROOM_BY_ID_PROFILE: {
      return {
        ...state,
        room: {participants: [action.profile]},
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
      state.room.message.push(action.payload)
      return state
    }
    case ActionTypes.RECEIVE_MESSAGE: {
      state.room.nbMessage = state.room.nbMessage + 1
      state.room.message.push(action.payload)
      return state
    }
    case ActionTypes.DELETE_ROOM_SUCCESS:{
      return {
        room: null,
        infoRoom: 'deletedRoom',
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.DELETE_MESSAGE_SUCCESS : {
      state.room.message.splice(state.room.message.map(x => x._id).indexOf(action.id), 1)
      state.room.nbMessage = state.room.nbMessage - 1
      return state
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

