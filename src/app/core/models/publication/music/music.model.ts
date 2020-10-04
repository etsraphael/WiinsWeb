import { ProfileModel } from '../../baseUser/profile.model';

export class Music {
  _id: string
  name: string
  file: string
  feat: string[]
  index: number
  img: string
  profile: ProfileModel
  isLiked: boolean
  idPlaylist: string

  constructor(name: string, file: string, feat: string[], _id?: string, idPlaylist?: string) {
    this.name = name
    this.file = file
    this.feat = feat
    this._id = _id
    this.idPlaylist = idPlaylist
  }
}
