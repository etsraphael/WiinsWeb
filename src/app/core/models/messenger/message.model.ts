export abstract class Message {
  _id: string
  createdAt: Date
  room: string

  constructor(public type: string) { }
}

export class MessageText extends Message {

  constructor(type: string, public text: string) {
    super(type)
  }

}
