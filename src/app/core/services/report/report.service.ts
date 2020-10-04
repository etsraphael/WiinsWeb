import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReportModel } from '../../models/report/report.model';


@Injectable({
  providedIn: 'root'
})

export class ReportService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  sendReport(report: ReportModel): Observable<ResponseReport>  {
    return this.http.post<ResponseReport>(`${this.baseUrl}/report/addOne`, {report})
  }

}

export interface ResponseReport {
  status: number;
  message: string;
}