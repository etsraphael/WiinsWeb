import { CommentModel } from 'src/app/core/models/comment/comment.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SingleCommentResponse {
  status: number;
  comment: CommentModel;
}

export interface GroupCommentResponse {
  status: number;
  results: CommentModel[];
  itemCount: number;
  pageCount: number;
  currentPage: number;
  next: number;
  prev: number;
}

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  // default
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}


  PostCommentToProfile(comment: CommentModel): Observable<SingleCommentResponse>  {
    return this.http.post<SingleCommentResponse>(`${this.baseUrl}/comments/toPublicationProfile`, comment );
  }

  PostCommentToPage(comment: CommentModel): Observable<SingleCommentResponse>  {
    return this.http.post<SingleCommentResponse>(`${this.baseUrl}/comments/toPublicationPage`, comment );
  }

  PostCommentToPlaylist(comment: CommentModel): Observable<SingleCommentResponse>  {
    return this.http.post<SingleCommentResponse>(`${this.baseUrl}/comments/toPlaylist`, comment );
  }

  PutComment(text: string, commentId: string): Observable<SingleCommentResponse>  {
    return this.http.put<SingleCommentResponse>(`${this.baseUrl}/comments/`, {
      text: text,
      commentId : commentId
    } );
  }

  DeleteComment(commentId: string, publicationId: string): Observable<SingleCommentResponse> {
    return this.http.get<SingleCommentResponse>(`${this.baseUrl}/comments/delete/${commentId}/${publicationId}`);
  }

  deleteCommentPlaylistMusic(commentId: string, playlistMusicId: string): Observable<SingleCommentResponse> {
    return this.http.get<SingleCommentResponse>(`${this.baseUrl}/comments/delete-comment-playlist-music/${commentId}/${playlistMusicId}`);
  }

  GetCommentById(page: string, idPublication: string): Observable<GroupCommentResponse> {
    const limit = '15';
    return this.http.get<GroupCommentResponse>(`${this.baseUrl}/comments/publication/${idPublication}`, {
      params: {
        limit: limit, page
      }
    });
  }

  GetCommentByIdPlaylist(page: string, idPlaylist: string): Observable<GroupCommentResponse> {
    const limit = '12';
    return this.http.get<GroupCommentResponse>(`${this.baseUrl}/comments/playlist/${idPlaylist}`, {
      params: {
        limit: limit, page
      }
    });
  }

  GetResponseById(page: string, idComment: string): Observable<GroupCommentResponse> {
    const limit = '5';
    return this.http.get<GroupCommentResponse>(`${this.baseUrl}/comments/response/${idComment}`, {
      params: {
        limit: limit, page
      }
    });
  }

  GetResponseByIdPlaylist(page: string, idComment: string): Observable<GroupCommentResponse> {
    const limit = '5';
    return this.http.get<GroupCommentResponse>(`${this.baseUrl}/comments/responsePlaylist/${idComment}`, {
      params: {
        limit: limit, page
      }
    })
  }

  PostResponse(response: CommentModel): Observable<SingleCommentResponse>  {
    return this.http.post<SingleCommentResponse>(`${this.baseUrl}/comments/response/`, response );
  }

}