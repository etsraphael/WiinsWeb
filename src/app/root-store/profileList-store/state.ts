import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { PageModel } from 'src/app/core/models/page/page.model';

export const featureAdapter: EntityAdapter<ProfileModel | PageModel>
  = createEntityAdapter<ProfileModel | PageModel>({ selectId: model => model._id })

export interface State extends EntityState<ProfileModel | PageModel> {
  isLoading?: boolean
  error?: string
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  }
)
