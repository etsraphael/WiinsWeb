import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerificationForm } from 'src/app/home-setting/certification-menu/veritification-steps/veritification-steps.component';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class CertificationService {

  // default
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createVerificationProfile(verification: VerificationForm): Observable<ResponseStatutAndMessage> {
    return this.http.post<ResponseStatutAndMessage>(`${this.baseUrl}/admin/createVerificationProfile`, {verification})
  }

  createCertificationProfile(): Observable<ResponseStatutAndMessage> {
    return this.http.get<ResponseStatutAndMessage>(`${this.baseUrl}/admin/createCertificationProfile`)
  }

  getCertificationProfile(): Observable<ResponseStatutAndMessage> {
    return this.http.get<ResponseStatutAndMessage>(`${this.baseUrl}/admin/getCertificationProfile`)
  }

  getVerificationProfile(): Observable<ResponseStatutAndMessage> {
    return this.http.get<ResponseStatutAndMessage>(`${this.baseUrl}/admin/getVerificationProfile`)
  }

}

export interface ResponseStatutAndMessage {
  status: number;
  message: string;
}
