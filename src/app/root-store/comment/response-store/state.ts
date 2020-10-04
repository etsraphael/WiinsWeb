import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CommentModel } from 'src/app/core/models/comment/comment.model';


export const featureAdapter: EntityAdapter<CommentModel> = createEntityAdapter<CommentModel>({
  selectId: model => model._id,
  sortComparer: (b: CommentModel, a: CommentModel): number =>
    b.createdAt.toString().localeCompare(a.createdAt.toString())
});

export interface State extends EntityState<CommentModel> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
