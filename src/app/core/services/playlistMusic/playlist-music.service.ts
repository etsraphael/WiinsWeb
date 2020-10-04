import { Injectable } from '@angular/core';
import { Playlist } from '../../models/music/playlist.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Music } from '../../models/publication/music/music.model';
import { MenuPlaylistModel } from '../../models/music/menuplaylist.model';

@Injectable({providedIn:'root'})

export class PlaylistMusicService {

  // default
  baseUrl = environment.baseUrl

  constructor( private http: HttpClient ) { }

  createPlaylist(playlist: Playlist): Observable<PlayslistResponse> {
    return this.http.post<PlayslistResponse>(`${this.baseUrl}/music/playlist`, playlist);
  }

  getPlaylistById(id: string): Observable<PlayslistResponse> {
    return this.http.get<PlayslistResponse>(`${this.baseUrl}/music/playlist/${id}`);
  }

  getListPlaylist(): Observable<ListPlayslistResponse> {
    return this.http.get<ListPlayslistResponse>(`${this.baseUrl}/music/paginate/playlist`);
  }

  getMyMusic(): Observable<MusicsResponse> {
    return this.http.get<MusicsResponse>(`${this.baseUrl}/music/myfavorite`);
  }

  likeMusic(id: string): Observable<LikedMusicResponse> {
    return this.http.post<LikedMusicResponse>(`${this.baseUrl}/music/liked/${id}`, null);
  }

  dislikeMusic(id: string): Observable<LikedMusicResponse> {
    return this.http.post<LikedMusicResponse>(`${this.baseUrl}/music/dislike/${id}`, null);
  }

  GetMenuPlaylist(): Observable<PlaylistMenuResponse> {
    return this.http.get<PlaylistMenuResponse>(`${this.baseUrl}/music/menu/playlist`)
  }

  GetPlaylistByType(name: string, page: number): Observable<ListPlayslistResponse> {
    return this.http.get<ListPlayslistResponse>(`${this.baseUrl}/music/playlist/type/${name}/${page}`)
  }

}

export interface PlaylistMenuResponse {
  status: number;
  message: string;
  menu: MenuPlaylistModel;
}

export interface MusicsResponse {
  status: number;
  message: string;
  playlist: Music[];
}

export interface LikedMusicResponse {
  status: number;
  message: string;
  reponse: string;
}

export interface PlayslistResponse {
  status: number;
  message: string;
  playlist: Playlist;
}

export interface ListPlayslistResponse {
  status: number;
  message: string;
  results: Playlist[];
}