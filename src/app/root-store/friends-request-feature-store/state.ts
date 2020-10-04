import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { RequestProfile } from 'src/app/core/models/request/request.model';

export const featureAdapter: EntityAdapter<RequestProfile> = createEntityAdapter<RequestProfile>({
  selectId: model => model._id,
  sortComparer: (a: RequestProfile, b: RequestProfile): number =>
    b.createdAt.toString().localeCompare(a.createdAt.toString())
});

export interface State extends EntityState<RequestProfile> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
