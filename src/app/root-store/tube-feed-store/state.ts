import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TubeModel } from 'src/app/core/models/tube/tube.model';

export const featureAdapter: EntityAdapter<TubeModel> = createEntityAdapter<TubeModel>({
  selectId: model => model._id,
  sortComparer: (a: TubeModel, b: TubeModel): number =>
    b.tube.createdAt.toString().localeCompare(a.tube.createdAt.toString())
})

export interface State extends EntityState<TubeModel> {
  isLoading?: boolean
  error?: any
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  }
)
