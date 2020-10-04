import { ProfileModel } from '../baseUser/profile.model';

export abstract class CommentModel {
  _id: string
  text: string
  idProfil: ProfileModel
  modified: Boolean
  createdAt: string
  upDate: string
  baseComment: string
  response: number
  like: number
  liked: boolean
  commentProfile: string | any
  space: string
  tagFriend: string[]

  constructor(tagFriend: string[], text: string, baseComment: string, commentProfile: string, space: string) {
    this.text = text
    this.baseComment = baseComment
    this.commentProfile = commentProfile
    this.space = space
    this.tagFriend = tagFriend
  }
}
