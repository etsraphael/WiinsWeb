import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PageModel } from 'src/app/core/models/page/page.model';


export const featureAdapter: EntityAdapter<PageModel> = createEntityAdapter<PageModel>({
  selectId: model => model._id,
});

export interface State extends EntityState<PageModel> {
  isLoading?: boolean;
  nextPage?: any;
  prevPage?: any;
  currentPage?: any;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    entities: {},
    ids: [],
    isLoading: false,
    nextPage: null,
    prevPage: null,
    currentPage: null,
    error: null
  }
);
