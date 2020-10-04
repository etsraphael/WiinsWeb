import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PrivacySetting } from '../../models/baseUser/privacySetting.model'
import { BtnFollow } from '../../models/baseUser/profile.model'

@Injectable({ providedIn: 'root' })

export class SettingUserService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ChangeVisibility(visibility: String): Observable<ResponseVisibility> {
    return this.http.put<ResponseVisibility>(`${this.baseUrl}/settings/vibility`, { visibility: visibility });
  }

  GetVisibility(): Observable<ResponseVisibility> {
    return this.http.get<ResponseVisibility>(`${this.baseUrl}/settings/vibility`);
  }

  changeBtnFollow(btnFollow: BtnFollow): Observable<ResponseBtnOption> {
    return this.http.put<ResponseBtnOption>(`${this.baseUrl}/profile/settingBtnFollow`, btnFollow);
  }

  resetPasswordEmail(email: string): Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(`${this.baseUrl}/auth/passwordForgot`, {email});
  }

  changingPassword(token: string, password: string): Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(`${this.baseUrl}/auth/resetPasswordByEmail/${token}`, {password});
  }

}

export interface ResponseMessage {
  status: string
  message: string
}

export interface ResponseVisibility {
  status: number;
  PrivacySetting: PrivacySetting;
}

export interface ResponseBtnOption {
  status: number;
  btnOption: BtnFollow;
}