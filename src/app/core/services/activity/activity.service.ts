import { LikeActivityModel } from './../../models/myActivity/likeActivity.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActivityService {

  // default
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  GetMyActivityLike(): Observable<ListLikeResponse> {
    return this.http.get<ListLikeResponse>(`${this.baseUrl}/activity/myActivityLike`, {
      // params: {
      //   limit: limit
      // }
    });
  }

}

export interface ListLikeResponse {
  status: number;
  activity: LikeActivityModel[];
}
