import { likeCommentPublicationModel, likeCommentPlaylistModel, likeFeedPublicationModel } from 'src/app/core/models/publication-options/like.model'

export interface State {
  like: likeCommentPublicationModel | likeCommentPlaylistModel | likeFeedPublicationModel;
  isLoading?: boolean;
  error?: any;
}

export const initialState = {
  like: null,
  isLoading: false,
  error: null
}
