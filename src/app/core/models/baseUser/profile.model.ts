import { UserModel } from './user.model'
import { DatePipe } from '@angular/common'
import { BaseModel } from './base.model'
import { PageModel } from '../page/page.model'

export class ProfileModel extends BaseModel {
  _id: string
  email: string
  picturecover: string
  pictureprofile: string
  introduction: string
  user: string
  friends: string[] 
  pages: string[] 
  groups: string[]
  adminsPage: PageModel[] 
  adminsGroup: string[]
  privacySettings: string
  relation: string
  userRelation: boolean
  birthDate: DatePipe
  active: boolean
  deactivatedAt: DatePipe
  deletedAt: DatePipe
  createdAt: DatePipe
  updatedAt: DatePipe
  _meta: UserModel
  mutalFriends: number
  follow: BtnFollow
  actifSpace: number
  levelCertification: number
  communityTotal: number
}


export class BtnFollow {
  friend: boolean
  following: boolean

  constructor(friend: boolean, following: boolean){
    this.friend = friend
    this.following = following
  }
}


