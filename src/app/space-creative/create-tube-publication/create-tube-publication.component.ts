import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ProfileFeatureStoreSelectors, TubeFeedStoreActions } from 'src/app/root-store';
import { skipWhile, filter } from 'rxjs/operators';
import { MatSnackBar, MatDialogRef, MatDialog, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment'
import { UrlSigned, UploadService, RespondGetUploadUrl } from 'src/app/core/services/upload/upload.service';
import * as uuid from 'uuid';
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component';
import { categorieGroup } from 'src/app/core/data/categorie-tube';
import { TubePublicationModel } from 'src/app/core/models/tube/tube.model';

@Component({
  selector: 'app-create-tube-publication',
  templateUrl: './create-tube-publication.component.html',
  styleUrls: ['./create-tube-publication.component.scss']
})

export class CreateTubePublicationComponent implements OnInit {

  // profile 
  myprofile$: Observable<ProfileModel>

  // video info
  videoName: string
  videoDuration: number

  // upload
  uploadVideoProgress = 0
  pictureUrl: string
  videoUrl: string
  uploadPictureSub: Subscription
  uploadVideoSub: Subscription

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  // visualisation
  pictureImg: ArrayBuffer | String
  groupCategorie = categorieGroup
  categorieSeleteted: CategorieSeleteted

  constructor(
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile),
    )

  }

  // upload the video
  uploadVideo(event: any): void {

    // to upload the file
    if (!event) return null
    let file = event.target.files[0]

    // send the video to s3
    this.sendTheVideo(file)

  }

  // send the video
  sendTheVideo(file: any): void {

    // to get the duration of the video
    var video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src)

      // if it's inferior than 30 sec
      if (video.duration < 31) {
        return this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.the-video-must-be-longer-than-30-sec'),
          this.translate.instant('CORE.close'), {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 5000
        })
      }

      // if it's superior than 30 sec
      else {

        // set the duration
        this.videoDuration = video.duration

        // send the video
        this.sendTheVideoToS3(file)
      }

    }

    // read the file
    video.src = URL.createObjectURL(file)

  }

  // upload to s3
  sendTheVideoToS3(file: File): void {

    // create the object to get the signed url from the backend
    const urlSigned: UrlSigned = {
      Bucket: environment.link_tube_video,
      Key: uuid.v4(),
      ContentType: file.type
    }

    // to get the s3 signed url
    this.uploadVideoSub = this.uploadService2.getSignedUrl(urlSigned).subscribe(
      (response: RespondGetUploadUrl) => {
        // upload to s3
        this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgressVideo(response, urlSigned.Key),
          (error: any) => console.log(error))
      },
      (error: RespondGetUploadUrl) => console.log(error)
    )

  }

  // to update the loading bar
  updateProgressVideo(event: HttpEvent<{}>, key: string): void {
    switch (event.type) {
      case HttpEventType.UploadProgress: {
        this.uploadVideoProgress = Math.round((100 * event.loaded) / event.total)
        break;
      }
      case HttpEventType.Response: {
        this.videoUrl = this.uploadService.getFileUrlAfterUpload(environment.link_tube_video, key);
        break;
      }
      default: break
    }
  }

  // upload the miniature
  previewMiniature(file: any): void {

    if (!file) return null

    // to open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: 'tube_poster' }
    })

    // to see update during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { return null }
      if (!!result.picture) { this.pictureImg = result.picture; return null }
      if (!!result.url) { this.pictureUrl = result.url; return null }
    })

    // unsubscribe after close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())
  }

  // send the publications tube
  submit(): void | MatSnackBarRef<SimpleSnackBar> {


    // check the file
    if (!this.videoUrl) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-wait-for-the-upload-to-complete'), null,
        { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    if (!this.pictureUrl) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-wait-for-the-upload-to-complete'), null,
        { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    // check the form 
    if (!this.videoName) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.els-ar-missing'), null,
        { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    if (!this.categorieSeleteted.code) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.els-ar-missing'), null,
        { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    // send the action
    const tube = new TubePublicationModel(
      this.videoName,
      this.videoUrl,
      this.pictureUrl,
      this.categorieSeleteted.index,
      this.categorieSeleteted.code,
      Math.round(this.videoDuration)
    )

    // send the project 
    this.store$.dispatch(new TubeFeedStoreActions.AddTubeFeed(tube))

  }

  // to set the categorie
  selectCategorie(index: number, code: number): void {
    this.categorieSeleteted = { index, code }
  }

}

interface CategorieSeleteted {
  index: number
  code: number
}