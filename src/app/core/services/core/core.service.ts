import { UserExtend } from '../../models/baseUser/userExtend.model';
import { PageModel } from 'src/app/core/models/page/page.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserModel } from '../../models/baseUser/user.model';
import { of, Observable } from 'rxjs';
import { ProfileModel } from '../../models/baseUser/profile.model';
import { MemberGroupModel } from '../../models/group/member-group.model';

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  GetCurrentUser(): Observable<UserModel> {
    const user = localStorage.getItem('user');
    if (!user) return of(null);
    return of(JSON.parse(user) as UserModel);
  }

  UpdateCurrentUser(user: UserModel): Observable<UserModel> {
    localStorage.setItem('user', JSON.stringify(user));
    return of(user);
  }

  UpdateCurrentProfile(profile: ProfileModel): Observable<ProfileModel> {
    localStorage.setItem('profile', JSON.stringify(profile));
    return of(profile);
  }

  GetPseudoValid(pseudo: string): Observable<ResponseProfileValid> {
    return this.http.get<ResponseProfileValid>(`${this.baseUrl}/users/pseudo-valid/${pseudo}`);
  }

  GetCurrentProfile(): Observable<ResponseGetProfile> {
    return this.http.get<ResponseGetProfile>(`${this.baseUrl}/myprofile`);
  }

  GetFriends(): Observable<ListFriendsResponse> {
    return this.http.get<ListFriendsResponse>(`${this.baseUrl}/friends`);
  }

  GetSearchUser(q: string, page: string = '1', limit: string = '25') {
    return this.http.get<ResponseGetProfileSearch>(`${this.baseUrl}/profiles`, {
      params: { limit, page, q }
    });
  }

  FriendProfile(q: string, page: string = '1', limit: string = '25') {
    return this.http.get<ResponseGetProfileSearch>(`${this.baseUrl}/friends/profiles`, {
      params: { limit, page, q }
    });
  }

  GetSearchPage(q: string, page: string = '1', limit: string = '25') {
    return this.http.get<ResponseGetPageSearch>(`${this.baseUrl}/pages/search`, {
      params: { limit, page, q }
    });
  }

  GetProfileByPseudo(pseudo: string): Observable<ResponseGetProfile> {
    return this.http.get<ResponseGetProfile>(`${this.baseUrl}/profile/pseudo/${pseudo}`);
  }

  GetProfileById(id: string): Observable<ResponseGetProfile> {
    return this.http.get<ResponseGetProfile>(`${this.baseUrl}/profileId/${id}`);
  }

  UserRegister(user: UserModel, userDetail: UserExtend): Observable<ResponseGetUserAndProfile> {
    return this.http.post<ResponseGetUserAndProfile>(`${this.baseUrl}/auth/signup`, {
      user: user, userDetail: userDetail
    });
  }

  UserUpdate(user: UserModel): Observable<ResponseGetUser> {
    return this.http.put<ResponseGetUser>(`${this.baseUrl}/users`, user);
  }

  ProfileUpdate(profile: ProfileModel) {
    return this.http.put(`${this.baseUrl}/profile`, profile);
  }

  PasswordUpdate(payload: UpdatePasswordPayload): Observable<ResponseUpdatePassword> {
    return this.http.post<ResponseUpdatePassword>(`${this.baseUrl}/security/password`, payload);
  }

  settingLangage(lg: string) {
    return this.http.get(`${this.baseUrl}/configuration/lang/${lg}`);
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }

  FollowProfile(id: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${this.baseUrl}/profile/follow/${id}`)
  }

  UnFollowProfile(id: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${this.baseUrl}/profile/unfollow/${id}`)
  }

  DeleteUser(password: String): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/users/deleteMyAccount`, { password })
  }

  getMyProfileList(type: String, page: number): Observable<ListProfilePageResponse> {
    return this.http.get<ListProfilePageResponse>(`${this.baseUrl}/mylist/profile/${type}/${page}`)
  }

  getLikedList(id: String, page: number): Observable<ListProfilePageResponse> {
    return this.http.get<ListProfilePageResponse>(`${this.baseUrl}/likes/list-liked/${id}/${page}`)
  }

  GetGroupMembers(id: string, page: number, total: number): Observable<ListProfilePageResponse> {
    return this.http.get<ListProfilePageResponse>(`${this.baseUrl}/group/getMembers/${id}/${page}/${total}`);
  }

  UpdatePictureProfile(link: string, type: string): Observable<LinkResponse> {
    return this.http.post<LinkResponse>(`${this.baseUrl}/profile/updatePicture/${type}`, { link });
  }

}

export interface LinkResponse {
  status: number;
  link: string;
}

export interface ListProfilePageResponse {
  status: number;
  message: string;
  results: ProfileModel[] | PageModel[] | MemberGroupModel[] | any;
}

export interface MessageResponse {
  status: number
  message: string
}

export interface ResponseProfileValid {
  status: number;
  response: boolean;
}

export interface ResponseUpdatePassword {
  status: number;
  message: string;
}

export interface ResponseGetProfile {
  status: number;
  message: string;
  profile: ProfileModel;
}

export interface ResponseGetGroupProfile {
  status: number;
  message: string;
  results: ProfileModel[];
}

export interface ResponseGetUser {
  status: number;
  message: string;
  user: UserModel;
}

export interface ResponseGetUserAndProfile {
  status: number;
  message: string;
  user: UserModel;
  profile: ProfileModel;
  token: string
}

export interface ListResponse<T> {
  status: number;
  message: string;
  results: T[];
  itemCount: number;
  pageCount: number;
  currentPage: number;
  next: number;
  prev: number;
}

export interface Response<T> {
  status: number;
  message: string;
}

export type ResponseGetProfileSearch = ListResponse<ProfileModel>;
export type ResponseGetPageSearch = ListResponse<PageModel>;
export type ListFriendsResponse = ListResponse<ProfileModel>;

