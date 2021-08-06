import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { PageModel } from 'src/app/core/models/page/page.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, PageFeatureStoreSelectors, FeedPublicationStoreActions } from 'src/app/root-store'
import { skipWhile, filter } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { PicturePublication, PostPublication, VideoPublication } from 'src/app/core/models/publication/feed/feed-publication.model';
import { IconAnimation } from 'src/assets/route-animation/icon-animation'
import { TranslateService } from '@ngx-translate/core'
import { NgxImageCompressService } from 'ngx-image-compress'
import { UploadService, UrlSigned, RespondGetUploadUrl } from 'src/app/core/services/upload/upload.service'
import * as uuid from 'uuid';
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service'
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-card-feed-page-publication',
  templateUrl: './card-feed-page-publication.component.html',
  styleUrls: ['./card-feed-page-publication.component.scss'],
  animations: [IconAnimation]
})

export class CardFeedPagePublicationComponent implements OnInit, OnDestroy {

  // page
  page$: Observable<PageModel>
  pictureProfile: string

  // DECLARATION LOGIC
  feedPublicationForm: FormGroup
  publicationType: string

  // DECLARATION ANIMATION
  firstcard = false
  logo_rotation = false
  imageSrc: string
  imgURL: any
  videoURL: any
  posterUrl: any
  buttonturned = false
  postedposter = false
  editedposter = false

  // mode of publication
  activeZone = 'none'

  // background-image of the publications
  choice1 = 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)'
  choice2 = 'linear-gradient(45deg, #ff0047 0%, #2c34c7 100%)'
  choice3 = 'linear-gradient(to left bottom, #17ea8a, #00c6bb, #009bca, #006dae, #464175)'
  choice4 = 'linear-gradient(to right top, #282812, #4a3707, #7b3d07, #b43527, #eb125c)'
  choice5 = 'linear-gradient(to right top, #000000, #000000, #000000, #000000, #000000)'
  choice6 = 'linear-gradient(to left bottom, #8d7ab5, #dc74ac, #ff7d78, #ffa931, #c0e003)'
  defaultbackground = this.choice1

  // Form extends for PostPublication
  background: string
  text: string
  videoType: any

  // upload
  uploadPicture = 0
  pictureUrl: string
  videoUrl: string
  uploadPictureSub: Subscription
  uploadVideoSub: Subscription

  // hastag
  hastagList: string[]
  @ViewChild('hastagContent', { static: false }) hastagContent: ElementRef;

  constructor(
    private store$: Store<RootStoreState.State>,
    private sanatizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private imageCompress: NgxImageCompressService,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService
  ) { }

  ngOnInit() {

    // load page
    this.page$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

    // We initialize the form and get the token
    this.feedPublicationForm = this.formBuilder.group({})

  }

  // get the form
  get f() { return this.feedPublicationForm.controls }

  // open the form
  openpublication() {
    this.firstcard = !this.firstcard
    this.buttonturned = !this.buttonturned
  }

  // close
  closepublication() {
    this.openpublication()
    this.activeZone = 'none'
    this.feedPublicationForm.reset()
    this.hastagList = []
  }

  // change the color of the background for the post
  changebackground(backgroundchoice: string): void {
    this.background = backgroundchoice;
  }

  // open post mode
  postmode() {
    this.publicationType = 'post'
    this.activeZone = 'postzone'
    this.background = this.defaultbackground
    this.updateForm(this.publicationType)
  }

  // open the picture or video mode
  preview(files: any): void | MatSnackBarRef<SimpleSnackBar> {
    if (files.length === 0) return null

    if (files[0].size > 50000000) return this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.file-over-50mb'),
      this.translate.instant('CORE.close'),
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )

    // get the file
    const reader = new FileReader()

    reader.onloadend = _event => {
      // open the picture mode
      if (files[0].type.match('image')) {
        this.imgURL = reader.result;
        this.activeZone = 'imgzone'
        this.publicationType = 'picture';
        this.updateForm(this.publicationType);
        this.uploadFileAndCompress(environment.link_feed_publication_image, files[0], reader.result)
      }

      if (files[0].type.match('video')) {
        const blob = new Blob([reader.result], { type: files[0].type });
        const url = URL.createObjectURL(blob);
        this.videoURL = this.sanatizer.bypassSecurityTrustResourceUrl(url);
        this.videoType = files[0].type;
        this.activeZone = 'videozone'
        this.publicationType = 'video';
        this.updateForm(this.publicationType);
        this.uploadFile(environment.link_feed_publication_video, files[0], reader.result)
      }
    }

    if (files[0].type.match('image')) reader.readAsDataURL(files[0])
    if (files[0].type.match('video')) reader.readAsArrayBuffer(files[0])
  }

  // add a poster for video
  previewposter(files: any): void | MatSnackBarRef<SimpleSnackBar> {
    if (files.length === 0) return null

    // get the file
    const reader = new FileReader();

    reader.onloadend = _event => {
      this.posterUrl = reader.result;
      this.postedposter = true;
      this.editedposter = true;
      setTimeout(() => { this.editedposter = false }, 3000)
      this.uploadFileAndCompress(environment.link_feed_publication_poster, files[0], reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // send the new feed publication
  createFeedPublication() {
    let publication = this.constructFeedPublication()
    if (this.checkVerification(publication.type) == false) {
      this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.els-ar-missing'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    } else this.sendPublication(publication)
  }

  // check verification
  checkVerification(type: string): Boolean {
    switch (type) {
      case 'PostPublication':
        if (this.feedPublicationForm.controls.text.status == 'INVALID') return false
        else return true
      case 'PicturePublication':
        if (!this.pictureUrl) return false
        else return true
      case 'VideoPublication':
        if (!this.videoUrl || !this.pictureUrl) return false
        else return true
    }
  }

  // update in store
  sendPublication(publication: FeedPublication) {
    this.store$.dispatch(new FeedPublicationStoreActions.AddFeedPublication(publication))
    this.closepublication()
  }

  // update for each type of publication
  updateForm(modeForm: string) {
    switch (modeForm) {
      case 'post': {
        this.feedPublicationForm.addControl('type', this.formBuilder.control('PostPublication', Validators.required));
        this.feedPublicationForm.addControl('background', this.formBuilder.control(this.background, Validators.required));
        this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
        break;
      }
      case 'picture': {
        this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
        break;
      }
      case 'video': {
        this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
        break;
      }
    }
  }

  // choose type of card
  constructFeedPublication(): FeedPublication {
    let pageID = this.route.parent.snapshot.paramMap.get('id')

    switch (this.publicationType) {
      case 'post': return new PostPublication(this.hastagList, null, this.background, this.feedPublicationForm.get('text').value, 'page', pageID)
      case 'picture': return new PicturePublication(this.hastagList, null, this.pictureUrl, this.feedPublicationForm.get('text').value, 'page', pageID)
      case 'video': return new VideoPublication(this.hastagList, null, this.feedPublicationForm.get('text').value, this.videoUrl, this.pictureUrl, 'page', pageID)
      default: return null
    }
  }

  // unsubscribe all var
  ngOnDestroy(): void {
    if (this.uploadPictureSub) this.uploadPictureSub.unsubscribe()
    if (this.uploadVideoSub) this.uploadVideoSub.unsubscribe()
  }

  // to add an hastag in the card
  addHastag() {
    if (!this.hastagList) this.hastagList = []
    if (this.hastagList.length >= 5) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.not-more-5-hastags'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }
    if (!this.hastagList.indexOf(String(this.hastagContent.nativeElement.value))) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.T-hashtag-is-already-there'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    }
    this.hastagList.push(this.hastagContent.nativeElement.value)
    this.hastagContent.nativeElement.value = null
  }

  // remove an hastag
  removeHastag(hastag: string): void {
    this.hastagList.splice(this.hastagList.indexOf(hastag), 1)
  }

  // to check all valid char
  omit_special_char(event: KeyboardEvent) {
    let k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
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
                this.uploadPictureSub = this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
                  (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned, 'image'),
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
    this.uploadVideoSub = this.uploadService2.getSignedUrl(urlSigned).subscribe(
      (response: RespondGetUploadUrl) => {
        // upload to s3
        this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned, 'video'),
          (error: any) => null)
      },
      (error: RespondGetUploadUrl) => null
    )

  }

  // to update the loading bar
  updateProgress(event: HttpEvent<{}>, urlSigned: UrlSigned, type: string): void {
    switch (event.type) {
      case HttpEventType.UploadProgress: { this.uploadPicture = Math.round((100 * event.loaded) / event.total); break }
      case HttpEventType.Response: { this.updateUrl(urlSigned.Bucket, urlSigned.Key, type); break }
      default: break
    }
  }

  // update url
  updateUrl(bucketName: string, key: string, type: string): void {
    switch (type) {
      case 'image': { this.pictureUrl = this.uploadService.getFileUrlAfterUpload(bucketName, key); break; }
      case 'video': { this.videoUrl = this.uploadService.getFileUrlAfterUpload(bucketName, key); break; }
      default: break
    }
  }

}