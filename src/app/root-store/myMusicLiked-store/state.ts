import { Music } from 'src/app/core/models/publication/music/music.model';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';


export const featureAdapter: EntityAdapter<Music> = createEntityAdapter<Music>({
  selectId: model => model._id
})

export interface State extends EntityState<Music> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null
})

