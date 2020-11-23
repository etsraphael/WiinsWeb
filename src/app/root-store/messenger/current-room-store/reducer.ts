import { ActionsMessage, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';
import * as _ from 'lodash'
import { Room } from 'src/app/core/models/messenger/room.model';

export function Reducer(state: State = initialState, action: ActionsMessage) {
  switch (action.type) {
    case ActionTypes.LOAD_CURRENT_ROOM_SUCCESS: {
      return featureAdapter.addMany(action.payload, state)
    }
    case ActionTypes.RESET_NOTIFICATION: {
      const currentRoomFound = state.entities[action.id]
      const update: Room = {
        ...state.entities[action.id],
        participants: [currentRoomFound.participants[0]],
        roomOption: {
          participants: [{
            ...state.entities[action.id].roomOption.participants[0],
            notification: 0
          }]
        }
      }
      return featureAdapter.updateOne({ id: action.id, changes: update }, state)
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
    case ActionTypes.ADD_ROOM: {
      return featureAdapter.addOne(action.payload, state)
    }
    case ActionTypes.DELETE_ROOM: {
      return featureAdapter.removeOne(action.id, state)
    }
    case ActionTypes.DELETE_ROOM_BY_PROFILE: {
      let list = Object.values(state.entities)

      for (let i of list) {
        if (i.participants[0]._id == action.id && i.participants.length == 1) {
          return featureAdapter.removeOne(i._id, state)
        }
      }

      return state
    }
    case ActionTypes.ADD_CURRENT_ROOM_SUCCESS: {
      return featureAdapter.addOne(action.payload, state)
    }
    case '@user/log_out' as any: return initialState
    default: return state
  }
}