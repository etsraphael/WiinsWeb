import { ProfileModel } from '../../baseUser/profile.model';
import { PageModel } from '../../page/page.model';
import { Music } from './music.model';

export class MusicProject {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  visibilityDate: String;
  name: string;
  introduction: string;
  musicList: Music[];
  like: {
    likeNumber: number;
    likeId: string;
    isLike: boolean;
  };
  profile: ProfileModel;
  page: PageModel;
  commentNumber: number;
  picture: string

  constructor(visibilityDate: string, introduction: string, musicList: Music[], picture: string, name?: string, _id?: string) {
    this.name = name
    this.visibilityDate = visibilityDate
    this.introduction = introduction
    this.musicList = musicList
    this.picture = picture
    this._id = _id
  }
}
