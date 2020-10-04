import { CommentModel } from '../comment/comment.model';
import { ProfileModel } from '../baseUser/profile.model';
import { BaseNotification } from './baseNotification.model';

export class ResponseNotifPlaylist extends BaseNotification {
  profile: ProfileModel;
  playlist: string
  comment: CommentModel;
}
