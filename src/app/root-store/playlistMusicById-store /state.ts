import { Playlist } from 'src/app/core/models/music/playlist.model';

export interface State {
  playlist: Playlist;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  playlist: null,
  isLoading: false,
  error: null
};

