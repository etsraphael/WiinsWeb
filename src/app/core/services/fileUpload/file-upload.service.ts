import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpEvent, HttpClient, HttpRequest } from '@angular/common/http'
import { environment } from '../../../../environments/environment'

@Injectable({ providedIn: 'root' })

export class FileUploadService {

  // default
  baseUrl = environment.baseUrl

  constructor(private httpClient: HttpClient) { }

  uploadAvatar(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/avatar`, formData, options);
    return this.httpClient.request(req);
  }

  uploadSmallFile(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/fs/${file.categorie}`, formData, options);
    return this.httpClient.request(req);
  }

  uploadVideo(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/fs/videos`, formData, options);
    return this.httpClient.request(req);
  }

  uploadPoster(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/fs/poster`, formData, options);
    return this.httpClient.request(req);
  }

  uploadCover(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/cover`, formData, options);
    return this.httpClient.request(req);
  }

  uploadPictureMusic(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/musicPicture`, formData, options);
    return this.httpClient.request(req);
  }

  uploadMusic(file: any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/music`, formData, options);
    return this.httpClient.request(req);
  }

  uploadMusicIndex(file: any, index: number): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file.payload, file.payload.name);
    const options = { content: formData, reportProgress: true };
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/music/${index}`, formData, options);
    return this.httpClient.request(req);
  }
  
}
