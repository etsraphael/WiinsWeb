import { CommentModel } from './comment.model';

export class commentPlaylist extends CommentModel {

  idPlaylist: string;

  constructor(tagFriend: string[], text: string, baseComment: string, commentProfile: string, idPlaylist: string) {
    super(tagFriend, text, baseComment, commentProfile, 'playlist');
    this.idPlaylist = idPlaylist;
  }
}
