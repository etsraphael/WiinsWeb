import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GroupModel } from '../../models/group/group.model';
import { Observable } from 'rxjs';
import { SingleFriendRequestReponse } from '../friend/friend-request.service';
import { ResponseGetProfile } from '../core/core.service';
import { ResponseGetAdmins } from '../page/page.service';
import { AdminGroup } from '../../models/page/admin.model';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  CreatGroup(page: GroupModel): Observable<ResponseGetGroup>  {
    return this.http.post<ResponseGetGroup>(`${this.baseUrl}/group/create`, page);
  }

  GetMyGroups(): Observable<ResponseListGroups>  {
    return this.http.get<ResponseListGroups>(`${this.baseUrl}/group/getMyGroups`);
  }

  GetGroupForAdmin(id: string): Observable<ResponseGetGroup>  {
    return this.http.get<ResponseGetGroup>(`${this.baseUrl}/group/groupAdmin/${id}`);
  }

  UpdateGroup(payload: GroupModel): Observable<ResponseGetGroup>  {
    return this.http.put<ResponseGetGroup>(`${this.baseUrl}/group/updateGroup`, payload);
  }

  AcceptRequest(id: string): Observable<SingleFriendRequestReponse> {
    return this.http.get<SingleFriendRequestReponse>(`${this.baseUrl}/group/acceptRequest/${id}`);
  }

  RefuseRequest(id: string): Observable<SingleFriendRequestReponse> {
    return this.http.get<SingleFriendRequestReponse>(`${this.baseUrl}/group/refuseRequest/${id}`);
  }

  AddRequestGroup(groupID: string, profileID: string): Observable<ResponseGetProfile> {
    return this.http.get<ResponseGetProfile>(`${this.baseUrl}/group/add/member/${groupID}/${profileID}`);
  }

  AddMember(teamId: string, profileId: string): Observable<ResponseGetProfile> {
    return this.http.post<ResponseGetProfile>(`${this.baseUrl}/admin/addInGroupTeam/${teamId}`, { profileId });
  }

  DeleteMemberGroup(groupID: string, profileID: string): Observable<ResponseGetProfile> {
    return this.http.get<ResponseGetProfile>(`${this.baseUrl}/group/deleteMember/${groupID}/${profileID}`);
  }

  leaveGroup(teamId: string, profileId: string, password: string): Observable<ResponseGetAdmins> {
    return this.http.post<ResponseGetAdmins>(`${this.baseUrl}/admin/leaveAdminGroup/${teamId}`, { profileId, password});
  }

  DeleteAdmin(teamId: string, profileId: string, password: string): Observable<ResponseGetAdminsGroup> {
    return this.http.post<ResponseGetAdminsGroup>(`${this.baseUrl}/admin/delete/${teamId}`, { profileId, password });
  }

  PromoteUser(teamId: string, profileId: string, password: string): Observable<ResponseGetAdminsGroup> {
    return this.http.post<ResponseGetAdminsGroup>(`${this.baseUrl}/admin/promoteMo/${teamId}`, { profileId, password });
  }

  DemoteUser(teamId: string, profileId: string, password: string): Observable<ResponseGetAdminsGroup> {
    return this.http.post<ResponseGetAdminsGroup>(`${this.baseUrl}/admin/demoteMa/${teamId}`, { profileId, password });
  }

  ReplacePr(teamId: string, profileId: string, password: string): Observable<ResponseGetAdminsGroup> {
    return this.http.post<ResponseGetAdminsGroup>(`${this.baseUrl}/admin/replacePr/${teamId}`, { profileId, password });
  }

  leaveMyGroup(id: string): Observable<ResponseGetID> {
    return this.http.get<ResponseGetID>(`${this.baseUrl}/group/leaveGroup/${id}`);
  }

}

export interface ResponseGetID {
  status: number
  message: string
  id: string
}

export interface ResponseGetAdminsGroup {
  status: number;
  message: string;
  result: AdminGroup;
}

export interface ResponseGetGroup {
  status: number
  message: string
  group: GroupModel
}

export interface ResponseListGroups {
  status: number
  message: string
  groups: GroupModel[]
}
