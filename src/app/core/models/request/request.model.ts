import { DatePipe } from '@angular/common'
import { GroupModel } from '../group/group.model'

export abstract class RequestProfile {
  _id: string
  createdAt: DatePipe
  from: {
    mutualFriend: number
  }

  constructor(public type: string) { }
}

export class FriendRequest extends RequestProfile {
  _meta: any

  constructor(_id: string) {
    super('FriendRequest')
    this._id = _id
  }
}

export class GroupRequest extends RequestProfile {
  _id: string
  group: GroupModel
}

