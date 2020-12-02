import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Message } from '../../models/messenger/message.model'
import { Observable } from 'rxjs'
import { Room } from '../../models/messenger/room.model'

@Injectable({
  providedIn: 'root'
})

export class MessengerService {

  // default
  baseUrl = environment.baseUrl

  // file notification
  audio = new Audio()

  constructor(private http: HttpClient) { }

  createRoom(room: Room): Observable<SingleRouteResponse>  {
    return this.http.post<SingleRouteResponse>(`${this.baseUrl}/messenger/create/room`, {room})
  }

  sendMessage(message: Message, idRoom: string): Observable<SingleMessageResponse>  {
    return this.http.post<SingleMessageResponse>(`${this.baseUrl}/messenger/sendMessage/${idRoom}`, {message})
  }

  GetAllRoomsByPage(page: number): Observable<ListRoomResponse>  {
    return this.http.get<ListRoomResponse>(`${this.baseUrl}/messenger/allRooms/${page}`)
  }

  GetCurrentRooms(): Observable<ListRoomResponse>  {
    return this.http.get<ListRoomResponse>(`${this.baseUrl}/messenger/currentRoom`)
  }

  GetRoomByID(id: string, page: number, nbMessage: number): Observable<SingleRouteResponse>  {
    return this.http.get<SingleRouteResponse>(`${this.baseUrl}/messenger/getRoomById/${id}/${page}/${nbMessage}`)
  }

  GetRoomByIDForNotif(id: string): Observable<SingleRouteResponse>  {
    return this.http.get<SingleRouteResponse>(`${this.baseUrl}/messenger/notif/getRoomById/${id}`)
  }

  GetRoomByIdProfile(id: string): Observable<SingleRouteResponse>  {
    return this.http.get<SingleRouteResponse>(`${this.baseUrl}/messenger/getRoomByIdProfile/${id}`)
  }

  GetRoomByIdProfiles(participants: string[]): Observable<SingleRouteResponse>  {
    return this.http.post<SingleRouteResponse>(`${this.baseUrl}/messenger/getRoomByIdProfiles`, {participants})
  }

  LoadMessageByPage(idRoom: string, page: number): Observable<ListMessageResponse>  {
    return this.http.get<ListMessageResponse>(`${this.baseUrl}/messenger/paginateInRoom/${idRoom}/${page}`)
  }

  DeleteMessage(idRoom: string, idMessage: string): Observable<MessengerDeleteResponse>  {
    return this.http.post<MessengerDeleteResponse>(`${this.baseUrl}/messenger/deleteMessage/${idRoom}/${idMessage}`, null)
  }

  DeleteRoom(idRoom: string): Observable<MessengerDeleteResponse>  {
    return this.http.get<MessengerDeleteResponse>(`${this.baseUrl}/messenger/deleteRoom/${idRoom}`)
  }

  MuteRoom(idRoom: string, enable: number): Observable<MessengerDeleteResponse>  {
    return this.http.get<MessengerDeleteResponse>(`${this.baseUrl}/messenger/muteRoom/${idRoom}/${enable}`)
  }

  NotificationSound(){
    this.audio.src = '../../../assets/audio/oringz-w465.mp3'
    this.audio.addEventListener('canplay', () => this.audio.play())
  }
}


export interface SingleMessageResponse {
  status: number
  message: string
  respond: Message
}

export interface ListMessageResponse {
  status: number
  result: Message[]
}

export interface ListRoomResponse {
  status: number
  results: Room[] // to update soon
  result: Room[]
}

export interface SingleRouteResponse {
  status: number
  message: string
  result: Room
}

export interface MessengerDeleteResponse  {
  status: number
  message: string
  id: string
}
