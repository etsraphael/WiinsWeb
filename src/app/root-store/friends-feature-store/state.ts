import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export const featureAdapter: EntityAdapter<ProfileModel> = createEntityAdapter<ProfileModel>({
  selectId: model => model._id
});

export interface State extends EntityState<ProfileModel> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
