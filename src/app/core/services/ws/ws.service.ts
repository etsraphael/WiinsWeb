import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { Message } from '../../models/messenger/message.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class WsService {

  // default
  baseSocket = environment.baseSocket
  ws: WebSocket

  constructor( ) { }

  createConnexion(token: string): WebSocket {
    this.ws = new WebSocket(`${this.baseSocket + token}`);
    return this.ws;
  }

  sendMessage(message: Message | any){
    this.ws.send(JSON.stringify(message))
  }

  closeConnexion(){
    this.ws.close()
  }

  handleOnMessage(socket: WebSocket): Observable<Message> {
    return new Observable(subscriber => {
      socket.onmessage = (messageEvent: MessageEvent) => {
        const message: Message = JSON.parse(messageEvent.data)
        subscriber.next(message)
      }
    })
  }

}
