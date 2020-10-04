import { Music } from 'src/app/core/models/publication/music/music.model';

export interface State {
  music: Music;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  music: null,
  isLoading: false,
  error: null
};
