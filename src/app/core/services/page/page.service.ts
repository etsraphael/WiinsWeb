import { AdminPage } from './../../models/page/admin.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PageModel } from '../../models/page/page.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  GetPage(id: string): Observable<ResponseGetPage>  {
    return this.http.get<ResponseGetPage>(`${this.baseUrl}/pages/id/${id}`);
  }

  CreatPage(page: PageModel): Observable<ResponseGetPage>  {
    return this.http.post<ResponseGetPage>(`${this.baseUrl}/pages/create`, page);
  }

  GetAdmins(pageId: string ): Observable<ResponseGetAdmins>  {
    return this.http.get<ResponseGetAdmins>(`${this.baseUrl}/pages/admins/${pageId}`);
  }

  FollowPage(pageId: string ): Observable<ResponseFollow>  {
    return this.http.post<ResponseFollow>(`${this.baseUrl}/pages/follow/${pageId}`, null);
  }

  UnfollowPage(pageId: string ): Observable<ResponseFollow>  {
    return this.http.post<ResponseFollow>(`${this.baseUrl}/pages/unfollow/${pageId}`, null);
  }

  EnablePage(pageId: string, password: string): Observable<ResponseGetPage>  {
    return this.http.post<ResponseGetPage>(`${this.baseUrl}/pages/enable/${pageId}`, { password });
  }

  DisablePage(pageId: string, password: string): Observable<ResponseGetPage>  {
    return this.http.post<ResponseGetPage>(`${this.baseUrl}/pages/disable/${pageId}`, { password });
  }

  DeletePage(pageId: string, password: string): Observable<ResponseGetPage>  {
    return this.http.post<ResponseGetPage>(`${this.baseUrl}/pages/delete/${pageId}`, { password });
  }

  DeleteUser(teamId: string, profileId: string, password: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/delete/${teamId}`, { profileId, password });
  }

  PromoteUser(teamId: string, profileId: string, password: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/promoteMo/${teamId}`, { profileId, password });
  }

  DemoteUser(teamId: string, profileId: string, password: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/demoteMa/${teamId}`, { profileId, password });
  }

  ReplacePr(teamId: string, profileId: string, password: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/replacePr/${teamId}`, { profileId, password });
  }

  AddMember(teamId: string, profileId: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/addInTeam/${teamId}`, { profileId });
  }

  leaveGroup(teamId: string, profileId: string, password: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/leaveGroupPage/${teamId}`, { profileId, password});
  }
  
}

export interface ResponseGetPage {
  status: number;
  message: string;
  page: PageModel;
}

export interface ResponseFollow {
  status: number;
  message: string;
}

export interface ResponseGetAdmins {
  status: number;
  message: string;
  result: AdminPage;
}

