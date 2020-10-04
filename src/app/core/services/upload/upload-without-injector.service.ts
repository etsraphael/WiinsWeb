import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RespondGetUploadUrl } from './upload.service';

@Injectable({
  providedIn: 'root'
})

export class UploadWithoutInjectorService {

  // default
  baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) { }

  getSignedUrl(urlSigned: any): Observable<RespondGetUploadUrl> {
    return this.http.post<RespondGetUploadUrl>(`${this.baseUrl}/fs/getSignedUrl`, { urlSigned })
  }

}
