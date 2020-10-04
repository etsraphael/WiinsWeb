import { ProfileModel } from '../baseUser/profile.model';
import { BaseNotification } from './baseNotification.model';
import { PicturePublication, PostPublication, VideoPublication, PublicationEvent  } from '../publication/feed/feed-publication.model';

export class LikeCommentNotif extends BaseNotification {
  profile: ProfileModel;
  publication: PicturePublication | PostPublication | VideoPublication | PublicationEvent;
}
