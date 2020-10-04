import { Room } from 'src/app/core/models/messenger/room.model'

export interface State {
  room?: Room;
  isLoading?: boolean;
  error?: any;
  infoRoom?: string;
}

export const initialState: State = {
  room: null,
  isLoading: false,
  error: null,
  infoRoom: null
};
