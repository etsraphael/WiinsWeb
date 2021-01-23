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
  interpreters: string[]
  writters: string[]
  producers: string[]
  categories: string[]


  constructor(
    name: string,
    file: string,
    feat: string[],
    interpreters: string[],
    writters: string[],
    producers: string[],
    categories: string[],
    _id?: string,
    idPlaylist?: string
  ) {
    this.name = name
    this.file = file
    this.feat = feat
    this.interpreters = interpreters
    this.writters = writters
    this.producers = producers
    this.categories = categories
    this._id = _id
    this.idPlaylist = idPlaylist
  }
}
