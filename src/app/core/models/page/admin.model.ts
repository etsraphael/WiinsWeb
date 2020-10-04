import { ProfileModel } from '../baseUser/profile.model';

export class AdminModel {
  _id: string;
  pageId: string;
  myrole: number;
  constructor(public members: OneRolePage[]) { }
}

export class OneRolePage {
  constructor(
    public profile: string | ProfileModel | any,
    public role: number
  ) { }
}

export class AdminPage {
  _id: string
  pageId: string
  president: ProfileModel
  managers: ProfileModel[]
  moderators: ProfileModel[]
}

export class AdminGroup {
  _id: string
  groupId: string
  president: ProfileModel
  managers: ProfileModel[]
  moderators: ProfileModel[]
}



