import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpBackend } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  // default
  baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) { }

  uploadfileAWSS3(fileuploadurl: string, file: File): Observable<HttpEvent<{}>> {
    // to reset the header 
    this.http = new HttpClient(this.handler);
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    const req = new HttpRequest('PUT', fileuploadurl, file, { headers: headers, reportProgress: true })
    return this.http.request(req)
  }

  urltoFile(url: string, filename: string, mimeType: string): Promise<any> {
    return (fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }))
    )
  }

  getFileUrlAfterUpload(bucketName: string, id: string): string {
    const amazonlink = '.s3.eu-west-3.amazonaws.com/'
    return `https://${bucketName}${amazonlink}${id}`
  }

}

export interface RespondGetUploadUrl {
  status: number
  url: string
}

export interface UrlSigned {
  Bucket: string
  Key: string
  ContentType: string
}