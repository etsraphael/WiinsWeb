import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { GroupModel } from 'src/app/core/models/group/group.model';

export const featureAdapter: EntityAdapter<GroupModel> = createEntityAdapter<GroupModel>({
  selectId: model => model._id,
  sortComparer: (a: GroupModel, b: GroupModel): number =>
    b.members_total.toString().localeCompare(a.members_total.toString())
});

export interface State extends EntityState<GroupModel> {
  isLoading?: boolean;
  error?: any;
  message: string;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null,
  message: null,
})
