import { Music } from 'src/app/core/models/publication/music/music.model';
export interface State {
  musicIsPlaying: Music;
  musicList: Music[];
  musicPlaying: boolean;
  isLoading?: boolean;
  error?: any;
  command: string;
}

export const initialState: State = {
  musicIsPlaying: null,
  musicPlaying: false,
  musicList: null,
  isLoading: false,
  error: null,
  command: null
};
