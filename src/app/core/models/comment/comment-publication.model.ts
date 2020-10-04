import { CommentModel } from './comment.model';

export class CommentFeedPublication extends CommentModel {

  idPublication: string;
  publicationProfile: string;
  commentProfile: string;

  constructor(tagFriend: string[], text: string, baseComment: string, commentProfile: string, idPublication: string, publicationProfile: string ) {
    super(tagFriend, text, baseComment, commentProfile, 'feed-publication');
    this.idPublication = idPublication;
    this.publicationProfile = publicationProfile;
    this.baseComment = baseComment;
    this.commentProfile = commentProfile;
  }
}
