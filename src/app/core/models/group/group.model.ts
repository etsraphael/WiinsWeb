import { AdminModel } from '../page/admin.model'
import { MemberGroupModel } from './member-group.model'

export class GroupModel {
  active: boolean
  members: MemberGroupModel[]
  members_total: number

  constructor(
    public name: string,
    public pictureprofile: string,
    public visibility: string,
    public admins: AdminModel | any,
    public _id?: string) { }
}
