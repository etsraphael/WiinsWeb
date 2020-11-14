import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CertificationService } from 'src/app/core/services/certification/certification.service';
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service';
import { RespondGetUploadUrl, UploadService, UrlSigned } from 'src/app/core/services/upload/upload.service';
import { environment } from 'src/environments/environment'
import * as uuid from 'uuid'

@Component({
  selector: 'app-veritification-steps',
  templateUrl: './veritification-steps.component.html',
  styleUrls: ['./veritification-steps.component.scss']
})

export class VeritificationStepsComponent implements OnInit {

  // file
  fileIdname: string
  pictureTakeName: string
  fileId: File
  pictureTake: File

  // sub
  uploadSubFileId: Subscription

  // form
  checkedCond = false

  // service 
  requestPending: boolean = false

  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private certificationService: CertificationService,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService
  ) { }

  ngOnInit() {

    // to know if the request is already sent
    this.certificationService.getVerificationProfile().pipe(take(1)).subscribe(
      () => { this.requestPending = true },
      () => { this.requestPending = false }
    )

  }

  saveIdFile(files: any) {

    // // to print the name of the file
    // if (event.target.files.length == 0) return null
    // this.fileIdname = event.target.files[0].name

    // // to compress to a file
    // this.uploadService.urltoFile(
    //   event.base64,
    //   event.target.files[0].name,
    //   event.target.files[0].type
    // ).then(file => { this.fileId = file })

    // // upload the first file
    // const reader = new FileReader()
    // reader.onloadend = _event => {
    //   console.log('ca passe')
    //   // this.uploadFile(environment.link_verification, this.fileId)
    // }

    // reader.readAsDataURL(this.fileId)

    if (files.length === 0) return null
    this.fileIdname = files[0].name
    const reader = new FileReader()

    // compress the file
    reader.onloadend = _event => {
      this.uploadFile(environment.link_verification, files[0])
    }

    // read the file
    reader.readAsDataURL(files[0])

  }

  savepictureTakeFile(event: any) {
    if (event.target.files.length == 0) return null
    this.pictureTakeName = event.target.files[0].name
  }

  changeCheckBtn(event: MatCheckboxChange) {
    this.checkedCond = event.checked
  }

  confirm(): void | MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'), null,
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )
  }

  // to upload a file
  uploadFile(bucketName: string, file: File) {

    // create the object to get the signed url from the backend
    const urlSigned: UrlSigned = {
      Bucket: bucketName,
      Key: uuid.v4(),
      ContentType: file.type
    }

    // to get the s3 signed url
    this.uploadSubFileId = this.uploadService2.getSignedUrl(urlSigned).subscribe(
      (response: RespondGetUploadUrl) => {
        // upload to s3
        return this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned),
          (error: any) => console.log(error))
      },
      (error: RespondGetUploadUrl) => console.log(error)

    )

  }

  // to update the loading bar
  updateProgress(event: HttpEvent<{}>, urlSigned: UrlSigned): void {
    switch (event.type) {
      case HttpEventType.Response: { this.sendTheConfirmation(urlSigned.Bucket, urlSigned.Key); break; }
      default: break
    }
  }

    // send the confirmation
    sendTheConfirmation(bucketName: string, key: string): void {

      // to get the url
      const url = this.uploadService.getFileUrlAfterUpload(bucketName, key)
      console.log(url)
  
  
    }
}

export interface VerificationForm {
  identityFile: string
  pictureTakeFile: string
}