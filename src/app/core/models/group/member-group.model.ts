import { ProfileModel } from '../baseUser/profile.model';

export class MemberGroupModel {
  profile: ProfileModel
  status: string

  constructor(profile: ProfileModel, status: string){
    this.profile = profile
    this.status = status
  }
}
