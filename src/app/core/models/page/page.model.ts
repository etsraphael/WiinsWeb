import { AdminModel } from './admin.model';

export class PageModel {
  _id: string;
  name: string;
  active: boolean;
  introduction: string;
  picturecover: string;
  pictureprofile: string
  followers: number;
  likes: number;
  admins: AdminModel;
  followed: boolean;

  constructor(name: string, pictureprofile: string, picturecover: string, admins: AdminModel, _id?: string) {
    this.name = name;
    this.pictureprofile = pictureprofile;
    this.picturecover = picturecover;
    this.admins = admins;
    this._id = _id
  }
}
