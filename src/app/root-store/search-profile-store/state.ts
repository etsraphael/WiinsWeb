import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export const featureAdapter: EntityAdapter<ProfileModel> = createEntityAdapter<ProfileModel>({
  selectId: model => model._id
});

export interface State extends EntityState<ProfileModel> {
  isLoading?: boolean
  spot?: string
  nextPage?: any
  prevPage?: any
  currentPage?: any
  error?: any
}

export const initialState: State = featureAdapter.getInitialState(
  {
    entities: {},
    ids: [],
    isLoading: false,
    spot: null,
    nextPage: null,
    prevPage: null,
    currentPage: null,
    error: null
  }
);
