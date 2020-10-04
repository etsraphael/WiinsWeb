import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { UserModel } from '../../models/baseUser/user.model'
import { Observable } from 'rxjs';
import { ResponseGetUserAndProfile } from '../core/core.service';

export class SigninResponse {
  status: number;
  message: string;
  user: UserModel;
  token: string;
}

export class TokenConfirmResponse {
  status: number;
  message: string;
  token: string;
  user: UserModel;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ResponseGetUserAndProfile> {
    return this.http.post<ResponseGetUserAndProfile>(`${this.baseUrl}/auth/signin`, { email, password });
  }

  getUserWithToken(token: string) {
    return this.http.get<SigninResponse>(`${this.baseUrl}/users/refresh/token/${token}`);
  }

  logout() {
    localStorage.removeItem('token');
  }

  confirmationToken(id: string) {
    return this.http.get<TokenConfirmResponse>(`${this.baseUrl}/auth/confirmation/${id}`);
  }

}
