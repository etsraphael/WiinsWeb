import { Music } from '../publication/music/music.model';

export class Playlist {

  _id: string;
  name: string;
  musicList: Music[];
  createdAt: Date;
  picture: string;

  constructor(name: string, picture: string, musicList: Music[]) {
    this.name = name;
    this.musicList = musicList;
    this.picture = picture
  }
  
}
