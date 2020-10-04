import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Playlist } from 'src/app/core/models/music/playlist.model';
import { MenuPlaylistModel } from 'src/app/core/models/music/menuplaylist.model';

export const featureAdapter: EntityAdapter<Playlist> = createEntityAdapter<Playlist>({
  selectId: model => model._id,
  sortComparer: (a: Playlist, b: Playlist): number =>
    b.createdAt.toString().localeCompare(a.createdAt.toString())
});

export interface State extends EntityState<Playlist> {
  menu?: MenuPlaylistModel;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    menu: null,
    isLoading: false,
    error: null
  }
);
