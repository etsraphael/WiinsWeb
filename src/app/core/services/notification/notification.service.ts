import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseNotification } from '../../models/notification/baseNotification.model';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  GetNumberRequest(): Observable<ResponseNumberRequest>  {
    return this.http.get<ResponseNumberRequest>(`${this.baseUrl}/notification/request`);
  }

  RequestChecked(): Observable<ResponseNotifSeen> {
    return this.http.get<ResponseNotifSeen>(`${this.baseUrl}/notification/request/seen`);
  }

  GetNumberAcitivity(): Observable<ResponseNumberRequest>  {
    return this.http.get<ResponseNumberRequest>(`${this.baseUrl}/notification/activity`);
  }

  AcitivityChecked(): Observable<ResponseNotifSeen> {
    return this.http.get<ResponseNotifSeen>(`${this.baseUrl}/notification/activity/seen`);
  }

  GetNotifications(page: string): Observable<ListNotificationResponse> {
    const limit = '6';
    return this.http.get<ListNotificationResponse>(`${this.baseUrl}/notification/activity/all`, {
      params: {
        limit: limit, page
      }
    });
  }

  NotificationSeenWithId(id: string): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${this.baseUrl}/notification/seenWithId/${id}`);
  }

}


export interface ResponseNumberRequest {
  status: number;
  number: number;
}

export interface ResponseNotifSeen {
  status: number;
  seen: Boolean;
}

export interface ListNotificationResponse {
  status: number;
  results: BaseNotification[];
  itemCount: number;
  pageCount: number;
  currentPage: number;
  next: number;
  prev: number;
}

export interface NotificationResponse {
  status: number
  notification: BaseNotification
}
