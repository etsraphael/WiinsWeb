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
        let udpateRoom = state.entities[action.id]
        udpateRoom.roomOption.participants[0].notification = 0
        return featureAdapter.updateOne({ id: action.id, changes: udpateRoom }, state)
      }
    }
    case ActionTypes.UPDATE_NOTIFICATION: {
      let udpateRoom = state.entities[action.id]
      udpateRoom.roomOption.participants[0].notification += 1
      return featureAdapter.updateOne({ id: action.id, changes: udpateRoom }, state)
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

