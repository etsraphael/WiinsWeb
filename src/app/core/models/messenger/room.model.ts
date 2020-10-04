import { Message } from './message.model'
import { ProfileModel } from '../baseUser/profile.model'
import { RoomOption } from './roomOption.model'

export class Room {
  _id: string
  name: string
  createdAt: Date
  message: Message[] | any
  lastMessage: Message
  participants: ProfileModel[] | any
  updatedAt: Date
  roomOption: RoomOption
  nbMessage: number

  constructor(participants: any, message: Message) {
    this.participants = participants
    this.message = message
  }
}