import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';

export interface State {
  publication?: FeedPublication;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  publication: null,
  isLoading: false,
  error: null
};
