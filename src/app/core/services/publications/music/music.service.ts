import { Injectable } from '@angular/core'
import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Music } from 'src/app/core/models/publication/music/music.model'

@Injectable({
  providedIn: 'root'
})

export class MusicService {

  // default
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  createFeedPublication(publication: MusicProject): Observable<MusicProjectResponse> {
    return this.http.post<MusicProjectResponse>(`${this.baseUrl}/music`, publication)
  }

  LoadMusicByProfile(id: string): Observable<ListMusicProjectResponse> {
    return this.http.get<ListMusicProjectResponse>(`${this.baseUrl}/music/profile/${id}`)
  }

  LoadMusicByMyProfile(): Observable<ListMusicProjectResponse> {
    return this.http.get<ListMusicProjectResponse>(`${this.baseUrl}/music/myMusicProject`)
  }

  GetMusicById(id: string): Observable<MusicResponse> {
    return this.http.get<MusicResponse>(`${this.baseUrl}/music/id/${id}`)
  }

  UpdateMusic(music: Music, categorie: string): Observable<MusicProjectResponse> {
    return this.http.put<MusicProjectResponse>(`${this.baseUrl}/music/modif`, {music,categorie})
  }

  UpdateMusicProject(musicProject: MusicProject, password: string): Observable<MusicProjectResponse> {
    return this.http.put<MusicProjectResponse>(`${this.baseUrl}/music/updateMusicProject/${musicProject._id}`, {musicProject, password})
  }

  DeleteMusic(publicationID: string, musicID: string, password: string): Observable<MusicProjectResponse> {
    return this.http.post<MusicProjectResponse>(`${this.baseUrl}/music/deleteMyMusic`, {publicationID, musicID, password})
  }

  DeleteMusicProject(id: string, password: string): Observable<MusicProjectResponse> {
    return this.http.put<MusicProjectResponse>(`${this.baseUrl}/music/musicProjectDelete/${id}`, {password})
  }

  DeletePlaylist(id: string, password: string): Observable<MusicProjectResponse> {
    return this.http.put<MusicProjectResponse>(`${this.baseUrl}/music/playlistDelete/${id}`,{password})
  }

}

interface MusicResponse {
  status: number;
  message: string;
  music: Music;
}

interface MusicResponse {
  status: number;
  message: string;
  music: Music;
}

interface MusicProjectResponse {
  status: number;
  message: string;
  publication: MusicProject;
  actifSpace: number
}

interface ListMusicProjectResponse {
  status: number;
  message: string;
  results: MusicProject[];
}