import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core'
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper'
import { NgxImageCompressService } from 'ngx-image-compress'
import { environment } from 'src/environments/environment'
import { UploadService, UrlSigned, RespondGetUploadUrl } from '../../services/upload/upload.service'
import * as uuid from 'uuid'
import { Subscription } from 'rxjs'
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { RootStoreState, ProfileFeatureStoreActions } from 'src/app/root-store'
import { UploadWithoutInjectorService } from '../../services/upload/upload-without-injector.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-crooper-image-validation',
  templateUrl: './crooper-image-validation.component.html',
  styleUrls: ['./crooper-image-validation.component.scss']
})

export class CrooperImageValidationComponent implements OnInit, OnDestroy {

  // output
  @Output() fileUpdate = new EventEmitter<any>();

  // file and animation
  imageChangedEvent: any
  file: File
  showCropper = false;

  // config
  config = {
    roundCropper: null,
    aspectRatio: 1,
    resizeToWidth: 720
  }

  // select the image
  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

  // upload 
  uploadSubCompress: Subscription
  uploadSub: Subscription
  loadingProgress: number = 0

  constructor(
    public dialogRef: MatDialogRef<CrooperImageValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public crooperfile: CrooperFile,
    private imageCompress: NgxImageCompressService,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService,
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {

    // set the crooper config for each type 
    this.imageChangedEvent = this.crooperfile.file
    switch (this.crooperfile.type) {
      case 'profile-page':
      case 'profile-group':
      case 'profile':
        this.config.roundCropper = true
        break;
      case 'cover':
      case 'cover-page':
        this.config.roundCropper = false
        this.config.aspectRatio = (71 / 15)
        break;
      case 'musicImg':
      case 'imgMusicPlayslit':
        this.config.roundCropper = false
        this.config.aspectRatio = (3 / 2)
        break;
      case 'small_spon_img':
      case 'tube_poster':
        this.config.aspectRatio = (3 / 2)
        break;
      case 'tall_spon_img':
        this.config.aspectRatio = (2 / 3)
        break;
    }
  }

  fileChangeEvent(event: any): void {
    // initialize the picture
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {

    // update the picture after a resizing 
    this.fileUpdate.emit({ picture: event.base64 })

    // to compress to a file
    this.uploadService.urltoFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
      this.imageChangedEvent.target.files[0].type
    ).then(file => { this.file = file })

  }

  imageLoaded() {
    // show the picture 
    this.showCropper = true
  }

  loadImageFailed() {
    // show a message // TO DO..

  }

  closeDialog() {
    // canceled the event and close the modal
    this.fileUpdate.emit(null)
    this.dialogRef.close()
  }

  confirm() {

    // create the reader 
    const reader = new FileReader()

    // for each type, we send the picture
    reader.onloadend = (_event: Event) => {
      switch (this.crooperfile.type) {
        // without the compression
        case 'cover': this.uploadFile(environment.link_cover, this.file, reader.result); break;
        case 'cover-page': this.uploadFile(environment.link_cover_page, this.file, reader.result); break;
        // with the compression
        case 'profile': this.uploadFileAndCompress(environment.link_avatar, this.file, reader.result); break;
        case 'musicImg': this.uploadFileAndCompress(environment.link_music_img, this.file, reader.result); break;
        case 'profile-group': this.uploadFileAndCompress(environment.link_avatar_group, this.file, reader.result); break;
        case 'profile-page': this.uploadFileAndCompress(environment.link_avatar_page, this.file, reader.result); break;
        case 'imgMusicPlayslit': this.uploadFileAndCompress(environment.link_music_img_playlist, this.file, reader.result); break;
        case 'tube_poster': this.uploadFileAndCompress(environment.link_tube_poster, this.file, reader.result); break;
      }
    }

    // we read the file
    reader.readAsDataURL(this.file)

  }

  // to upload a file and compress
  uploadFileAndCompress(bucketName: string, file: File, reader: ArrayBuffer | String | any) {

    // create the object to get the signed url from the backend
    const urlSigned: UrlSigned = {
      Bucket: bucketName,
      Key: uuid.v4(),
      ContentType: file.type
    }

    // to compress the file
    this.imageCompress.compressFile(reader, -1, 75, 50).then(
      (result: string) => {

        // to compress to a file
        this.uploadService.urltoFile(result, file.name, file.type)
          .then((file: File) =>

            // to get the s3 signed url
            this.uploadService2.getSignedUrl(urlSigned).subscribe(
              (response: RespondGetUploadUrl) => {
                // upload to s3
                this.uploadSubCompress = this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
                  (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned),
                  (error: any) => null)
              },
              (error: RespondGetUploadUrl) => null
            )

          )
      }

    )
  }

  // to upload a file
  uploadFile(bucketName: string, file: File, reader: ArrayBuffer | String) {

    // create the object to get the signed url from the backend
    const urlSigned: UrlSigned = {
      Bucket: bucketName,
      Key: uuid.v4(),
      ContentType: file.type
    }

    // to get the s3 signed url
    this.uploadSub = this.uploadService2.getSignedUrl(urlSigned).subscribe(
      (response: RespondGetUploadUrl) => {
        // upload to s3
        return this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned),
          (error: any) => null)
      },
      (error: RespondGetUploadUrl) => null
    )

  }

  // to update the loading bar
  updateProgress(event: HttpEvent<{}>, urlSigned: UrlSigned): void {
    switch (event.type) {
      case HttpEventType.Sent: { this.loadingProgress = 1; break }
      case HttpEventType.UploadProgress: { this.loadingProgress = Math.round((100 * event.loaded) / event.total); break }
      case HttpEventType.Response: { this.sendTheConfirmation(urlSigned.Bucket, urlSigned.Key); break; }
      default: break
    }
  }

  // send the confirmation
  sendTheConfirmation(bucketName: string, key: string): void {

    // to get the url
    const url = this.uploadService.getFileUrlAfterUpload(bucketName, key)

    // if we need to update the store
    switch (this.crooperfile.type) {
      case 'profile': this.store$.dispatch(new ProfileFeatureStoreActions.UpdateAvatar(url)); break;
      case 'cover': this.store$.dispatch(new ProfileFeatureStoreActions.UpdateCover(url)); break;
      case 'musicImg':
      case 'profile-group':
      case 'profile-page':
      case 'tube_poster':
      case 'cover-page':
      case 'imgMusicPlayslit': {
        this.fileUpdate.emit({ url });
        break;
      }
    }

    // close the modal
    setTimeout(() => this.dialogRef.close(), 3000)

  }

  ngOnDestroy(): void {
    if (this.uploadSub) this.uploadSub.unsubscribe()
    if (this.uploadSubCompress) this.uploadSubCompress.unsubscribe()
  }

}




export interface CrooperFile {
  file: Event | any
  type: string
}
