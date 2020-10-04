import { ProfileModel } from '../baseUser/profile.model';
import { BaseNotification } from './baseNotification.model';
import { PicturePublication, PostPublication, VideoPublication, PublicationEvent } from 'src/app/core/models/publication/feed/feed-publication.model';

export class LikeNotif extends BaseNotification {
  profile: ProfileModel;
  publication: PicturePublication | PostPublication | VideoPublication | PublicationEvent;
}
