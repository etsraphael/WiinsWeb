import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BaseNotification } from 'src/app/core/models/notification/baseNotification.model';

export const featureAdapter: EntityAdapter<BaseNotification> = createEntityAdapter<BaseNotification>({
  selectId: model => model._id,
  sortComparer: (a: BaseNotification, b: BaseNotification): number =>
    b.updatedAt.toString().localeCompare(a.updatedAt.toString())
});

export interface State extends EntityState<BaseNotification> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
