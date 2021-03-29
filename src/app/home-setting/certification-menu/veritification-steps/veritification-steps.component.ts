import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CertificationService } from 'src/app/core/services/certification/certification.service';
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service';
import { RespondGetUploadUrl, UploadService, UrlSigned } from 'src/app/core/services/upload/upload.service';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Component({
  selector: 'app-veritification-steps',
  templateUrl: './veritification-steps.component.html',
  styleUrls: ['./veritification-steps.component.scss']
})

export class VeritificationStepsComponent implements OnInit, OnDestroy {

  // file
  fileIdname: string;
  fileIdLink: string;
  fileId: File;

  fileIdname2: string;
  fileIdLink2: string;
  fileId2: File;

  pictureTakeName: string;
  pictureTake: File;
  pictureTakeLink: string;

  // sub
  uploadSubFileId: Subscription;

  // form
  checkedCond = false;

  // service
  requestPending = false;
  loading = false;

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
      () => { this.requestPending = true; },
      () => { this.requestPending = false; }
    );

  }

  saveIdFile(files: any) {
    if (files.length === 0) return null;
    this.fileIdname = files[0].name;
    this.fileId = files[0];

    // send the fileId
    const reader = new FileReader();
    reader.onloadend = _event => { this.uploadFile(this.fileId, 'fileId'); };
    reader.readAsDataURL(this.fileId);
  }

  saveIdFile2(files: any) {
    if (files.length === 0) return null;
    this.fileIdname2 = files[0].name;
    this.fileId2 = files[0];

    // send the fileId
    const reader = new FileReader();
    reader.onloadend = _event => { this.uploadFile(this.fileId2, 'fileId2'); };
    reader.readAsDataURL(this.fileId2);
  }

  savepictureTakeFile(files: any) {
    if (files.length == 0) return null;
    this.pictureTakeName = files[0].name;
    this.pictureTake = files[0];

    // send the pictureTake and send the verification
    const reader2 = new FileReader();
    reader2.onloadend = _event => { this.uploadFile(this.pictureTake, 'pictureTake'); };
    reader2.readAsDataURL(this.pictureTake);
  }

  changeCheckBtn(event: MatCheckboxChange) {
    this.checkedCond = event.checked;
  }

  confirm(): void | MatSnackBarRef<SimpleSnackBar> {

    if (!this.checkedCond) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.y-h-to-accept-the-tou'), null,
        { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      );
    }

    this.loading = true;

    if (!this.pictureTakeLink || !this.fileIdLink) {
      this.loading = false;
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'), null,
        { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      );
    } else {
      const verificationForm: VerificationForm = {
        identityFile: this.fileIdLink,
        identityFileBack: this.fileIdLink2,
        pictureTakeFile: this.pictureTakeLink
      };
      this.certificationService.createVerificationProfile(verificationForm).pipe(take(1)).subscribe(
        action => {
          this.loading = false;
          this.requestPending = true;
        },
        error => {
          this.loading = false;
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          );
        }
      );
    }

  }

  // to upload a file
  uploadFile(file: File, type: string) {

    // create the object to get the signed url from the backend
    const urlSigned: UrlSigned = {
      Bucket: environment.link_verification,
      Key: uuid.v4(),
      ContentType: file.type
    };

    // to get the s3 signed url
    this.uploadSubFileId = this.uploadService2.getSignedUrl(urlSigned).subscribe(
      (response: RespondGetUploadUrl) => {
        // upload to s3
        return this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned, type),
          (error: any) => null);
      },
      (error: RespondGetUploadUrl) => null

    );

  }

  // to update the loading bar
  updateProgress(event: HttpEvent<{}>, urlSigned: UrlSigned, type: string): void {
    switch (event.type) {
      case HttpEventType.Response: { this.sendTheConfirmation(urlSigned.Bucket, urlSigned.Key, type); break; }
      default: break;
    }
  }

  // update the url
  sendTheConfirmation(bucketName: string, key: string, type: string): void {

    switch (type) {
      case 'fileId':
        this.fileIdLink = this.uploadService.getFileUrlAfterUpload(bucketName, key);
        break;
      case 'fileId2':
        this.fileIdLink2 = this.uploadService.getFileUrlAfterUpload(bucketName, key);
        break;
      case 'pictureTake':
        this.pictureTakeLink = this.uploadService.getFileUrlAfterUpload(bucketName, key);
        break;
    }
  }

  resetUpload(link: string): void {
    switch (link) {
      case 'pictureTakeLink':
        this.pictureTakeLink = null;
        this.pictureTakeName = null;
        break;
      case 'fileIdLink':
        this.fileIdLink = null;
        this.fileIdname = null;
        break;
      case 'fileIdLink2':
        this.fileIdLink2 = null;
        this.fileIdname2 = null;
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.uploadSubFileId) this.uploadSubFileId.unsubscribe();
  }

}

export interface VerificationForm {
  identityFile: string;
  identityFileBack: string;
  pictureTakeFile: string;
}