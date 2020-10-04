import { ProfileModel } from '../baseUser/profile.model';
import { BaseNotification } from './baseNotification.model';
import { PicturePublication, PostPublication, VideoPublication, PublicationEvent  } from '../publication/feed/feed-publication.model';
import { CommentModel } from '../comment/comment.model';

export class CommentNotif extends BaseNotification {
  profile: ProfileModel;
  publication: PicturePublication | PostPublication | VideoPublication | PublicationEvent;
  comment: CommentModel;
}
