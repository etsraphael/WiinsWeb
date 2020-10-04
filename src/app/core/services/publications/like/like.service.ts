import { likeModel } from '../../../models/publication-options/like.model'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addFeedPublicationLike(like: likeModel): Observable<SingleLikeResponse>  {
    return this.http.post<SingleLikeResponse>(`${this.baseUrl}/likes`, like)
  }

  addLikeComment(like: likeModel): Observable<SingleLikeResponse>  {
    return this.http.post<SingleLikeResponse>(`${this.baseUrl}/likes/comment`, like)
  }

  deleteFeedPublicationLike(id: string): Observable<SingleLikeResponse>  {
    return this.http.get<SingleLikeResponse>(`${this.baseUrl}/likes/dislikeFeedPublication/${id}`)
  }

  deleteLikeComment(id: string): Observable<SingleLikeResponse>  {
    return this.http.get<SingleLikeResponse>(`${this.baseUrl}/likes/comment/${id}`)
  }

}

export interface SingleLikeResponse {
  status: number
  id: string
}
