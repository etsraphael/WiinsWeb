import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ViewStatService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  viewPage(id: String): Observable<ViewResponse> {
    return this.http.post<ViewResponse>(`${this.baseUrl}/stats/addViewPage/${id}`, null)
  }

}

export interface ViewResponse {
  status: number
  message: string
}