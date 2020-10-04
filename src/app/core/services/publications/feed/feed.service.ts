import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  newPublication(publication: FeedPublication): Observable<SingleFeedPublicationResponse> {
    return this.http.post<SingleFeedPublicationResponse>(`${this.baseUrl}/publication`, publication);
  }

  getFeedPublication(page: string, url: string): Observable<ListFeedPublicationResponse> {
    return this.http.get<ListFeedPublicationResponse>(`${this.baseUrl}/publication/${url}`, {
      params: { limit: '8', page }
    })
  }

  getFeedPublicationByGroups(page: string): Observable<ListFeedPublicationResponse> {
    const limit = '8';
    return this.http.get<ListFeedPublicationResponse>(`${this.baseUrl}/publication/GetGroupFeedPublication`, {
      params: { limit: limit, page }
    })
  }

  getFeedPublicationByGroupsID(page: string, groups: string[]): Observable<ListFeedPublicationResponse> {
    const limit = '8';
    return this.http.post<ListFeedPublicationResponse>(`${this.baseUrl}/publication/GetGroupFeedPublication`, {
      params: { limit: limit, page },
      groups
    })
  }

  getFeedPublicationByID(id: string): Observable<SingleFeedPublicationResponse> {
    return this.http.get<SingleFeedPublicationResponse>(`${this.baseUrl}/publication/id/${id}`);
  }

  getTopFeedPublication(): Observable<ListFeedPublicationResponse> {
    return this.http.get<ListFeedPublicationResponse>(`${this.baseUrl}/publication/topFeedPublication`);
  }

  LoadSuggestHastag(): Observable<SuggestHastagResponse> {
    return this.http.get<SuggestHastagResponse>(`${this.baseUrl}/publication/discover/topHastag`);
  }

  deleteFeedPublication(id: string): Observable<SingleFeedPublicationResponse> {
    return this.http.delete<SingleFeedPublicationResponse>(`${this.baseUrl}/publication/delete/${id}`);
  }
}

export interface SuggestHastagResponse {
  status: number;
  message: string;
  hastags: string[];
}

export interface SingleFeedPublicationResponse {
  status: number;
  message: string;
  publication: FeedPublication;
}

export interface ListFeedPublicationResponse {
  status: number;
  results: FeedPublication[];
  itemCount: number;
  pageCount: number;
  currentPage: number;
  next: number;
  prev: number;
}