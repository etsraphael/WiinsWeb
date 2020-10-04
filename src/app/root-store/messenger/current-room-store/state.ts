import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Room } from 'src/app/core/models/messenger/room.model';

export const featureAdapter: EntityAdapter<Room> = createEntityAdapter<Room>({
  selectId: model => model._id,
  sortComparer: (a: Room, b: Room): number =>
    b.updatedAt.toString().localeCompare(a.updatedAt.toString())
});

export interface State extends EntityState<Room> {
  statut?: number;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    statut: null,
    isLoading: false,
    error: null
  }
);
