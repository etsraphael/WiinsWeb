import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TubeMenuModel } from '../../models/tube/tubeMenu.model';
import { TubePageModel } from '../../models/tube/tubePage.model';
import { TubeModel, TubePublicationModel } from '../../models/tube/tube.model';

@Injectable({
  providedIn: 'root'
})

export class TubeService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getMenu(): Observable<TubeMenuResponse> {
    return this.http.get<TubeMenuResponse>(`${this.baseUrl}/tube/menu`)
  }

  getTubePage(id: string): Observable<TubePageResponse> {
    return this.http.get<TubePageResponse>(`${this.baseUrl}/tube/video/${id}`)
  }

  getTubeFeed(page: string, profile: string): Observable<TubesResponse> {
    return this.http.get<TubesResponse>(`${this.baseUrl}/tube/profile/${profile}`, {
      params: { page }
    })
  }

  deleteTubeById(id: string): Observable<DeletetionResponse> {
    return this.http.get<DeletetionResponse>(`${this.baseUrl}/tube/deleteTube/${id}`)
  }

  createTube(tube: TubePublicationModel): Observable<TubeProjectResponse> {
    return this.http.post<TubeProjectResponse>(`${this.baseUrl}/tube/post`, tube)
  }

}

export interface TubeProjectResponse {
  status: number;
  message: string;
  tube: TubeModel;
  actifSpace: number
}


export interface DeletetionResponse {
  status: number
  id: string
}


export interface TubesResponse {
  status: number
  message: string
  results: TubeModel[]
}

export interface TubeMenuResponse {
  status: number
  message: string
  menu: TubeMenuModel
}

export interface TubePageResponse {
  status: number
  message: string
  page: TubePageModel
}

