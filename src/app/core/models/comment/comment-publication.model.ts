import { CommentModel } from './comment.model';

export class CommentFeedPublication extends CommentModel {

  publicationId: string;
  publicationProfile: string;
  commentProfile: string;

  constructor(tagFriend: string[], text: string, baseComment: string, commentProfile: string, publicationId: string, publicationProfile: string ) {
    super(tagFriend, text, baseComment, commentProfile, 'feed-publication');
    this.publicationId = publicationId;
    this.publicationProfile = publicationProfile;
    this.baseComment = baseComment;
    this.commentProfile = commentProfile;
  }
}
