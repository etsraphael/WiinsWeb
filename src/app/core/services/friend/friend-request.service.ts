import { ListResponse } from '../core/core.service';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestProfile } from '../../models/request/request.model';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  Create(id: string): Observable<SingleFriendRequestReponse> {
    return this.http.get<SingleFriendRequestReponse>(`${this.baseUrl}/friends/createRequest/${id}`);
  }

  CancelWidthProfile(id: string): Observable<SingleFriendRequestReponse> {
    return this.http.get<SingleFriendRequestReponse>(`${this.baseUrl}/friends/cancelWidthProfile/${id}`);
  }

  ConfirmWidthProfile(id: string): Observable<SingleFriendRequestReponse> {
    return this.http.get<SingleFriendRequestReponse>(`${this.baseUrl}/friends/addWithProfile/${id}`);
  }

  RefuseWidthProfile(id: string): Observable<SingleFriendRequestReponse> {
    return this.http.get<SingleFriendRequestReponse>(`${this.baseUrl}/friends/refuseWithProfile/${id}`)
  }

  GetAll(): Observable<ListFriendRequestsResponse> {
    return this.http.get<ListFriendRequestsResponse>(`${this.baseUrl}/requests`);
  }

  GetRequestToMe(): Observable<ListFriendRequestsResponse> {
    return this.http.get<ListFriendRequestsResponse>(`${this.baseUrl}/requests/requestsToMe`);
  }

}

export interface SingleFriendRequestReponse {
  status: number;
  message: string;
  request: RequestProfile;
}

type ListFriendRequestsResponse = ListResponse<RequestProfile>;
