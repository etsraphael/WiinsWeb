import { ProfileModel } from '../baseUser/profile.model';

export class TubeModel {
  _id: string;
  id: string;
  score: {
    views: Number;
    boostView: Number;
    ratio: Number;
  };
  categorie: Number;
  subcategorie: Number;
  tube: {
    _id: string;
    totalView: Number;
    totalLike: Number;
    otherUser: [ProfileModel],
    name: string;
    videoLink: string;
    posterLink: string;
    profile: ProfileModel;
    createdAt: Date;
    updatedAt: Date;
    duration: number
  }
}

export class TubePublicationModel {
  constructor(
    public name: string,
    public videoLink: string,
    public posterLink: string,
    public categorie: number,
    public subcategorie: number,
    public duration: number
  ) { }
}