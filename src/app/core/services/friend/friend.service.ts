import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../models/baseUser/profile.model';

@Injectable({
  providedIn: 'root'
})

export class FriendService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  DeleteFriend(id: string): Observable<ResponseGetResponseFriendUpdate> {
    return this.http.get<ResponseGetResponseFriendUpdate>(`${this.baseUrl}/friends/deletefriend/${id}`)
  }
  
}

export interface ResponseGetResponseFriendUpdate {
  status: number;
  message: string;
  profile: ProfileModel;
  friendId: string
}
