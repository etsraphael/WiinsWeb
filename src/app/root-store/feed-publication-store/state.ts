import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';

export const featureAdapter: EntityAdapter<FeedPublication> = createEntityAdapter<FeedPublication>({
  selectId: model => model._id,
  sortComparer: (a: FeedPublication, b: FeedPublication): number =>
    b.createdAt.toString().localeCompare(a.createdAt.toString())
})

export interface State extends EntityState<FeedPublication> {
  groupSelected: string[]
  suggestList: string[]
  isLoading?: boolean
  error?: any
}

export const initialState: State = featureAdapter.getInitialState(
  {
    groupSelected: [],
    suggestList: null,
    isLoading: false,
    error: null,
  }
)
