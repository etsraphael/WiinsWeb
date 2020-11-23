import { Room } from 'src/app/core/models/messenger/room.model'
import { ActionsMessage, ActionTypes } from './actions'
import { featureAdapter, initialState, State } from './state'

export function Reducer(state: State = initialState, action: ActionsMessage) {
  switch (action.type) {
    case ActionTypes.LOAD_ALL_ROOMS_BY_PAGE_SUCCESS: {
      return featureAdapter.addMany(action.payload, state)
    }
    case ActionTypes.RESET_NOTIFICATION: {
      if(typeof state.entities[action.id] == 'undefined'){
        return state
      } else {
        const currentRoomFound = state.entities[action.id]
        const update: Room = {
          ...state.entities[action.id],
          participants: [currentRoomFound.participants[0]],
          roomOption: {
            participants: [{
              ...state.entities[action.id].roomOption.participants[0],
              notification: state.entities[action.id].roomOption.participants[0].notification + 1
            }]
          }
        }
        return featureAdapter.updateOne({ id: action.id, changes: update }, state)
      }
    }
    case ActionTypes.UPDATE_NOTIFICATION: {
      const currentRoomFound = state.entities[action.id]
      const update: Room = {
        ...state.entities[action.id],
        participants: [currentRoomFound.participants[0]],
        roomOption: {
          participants: [{
            ...state.entities[action.id].roomOption.participants[0],
            notification: state.entities[action.id].roomOption.participants[0].notification + 1
          }]
        }
      }
      return featureAdapter.updateOne({ id: action.id, changes: update }, state)
    }
    case ActionTypes.DELETE_ROOM: {
      return featureAdapter.removeOne(action.id, state);
    }
    case ActionTypes.ADD_ROOM: {
      return featureAdapter.addOne(action.payload, state)
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

