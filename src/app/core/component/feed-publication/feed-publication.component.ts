import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { environment } from 'src/environments/environment'
import { DomSanitizer } from '@angular/platform-browser'
import { RootStoreState, SearchProfileStoreActions, SearchProfileStoreSelectors, FeedPublicationStoreActions } from 'src/app/root-store'
import { ProfileFeatureStoreSelectors } from 'src/app/root-store'
import { filter, debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { IconAnimation } from 'src/assets/route-animation/icon-animation'
import { ProfileModel } from '../../models/baseUser/profile.model'
import { FeedPublication, PostPublication, PicturePublication, VideoPublication } from '../../models/publication/feed/feed-publication.model'
import { TranslateService } from '@ngx-translate/core'
import { NgxImageCompressService } from 'ngx-image-compress'
import { UploadService, RespondGetUploadUrl, UrlSigned } from '../../services/upload/upload.service'
import * as uuid from 'uuid';
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { UploadWithoutInjectorService } from '../../services/upload/upload-without-injector.service'
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-feed-publication',
  templateUrl: './feed-publication.component.html',
  styleUrls: ['./feed-publication.component.scss'],
  animations: [IconAnimation]
})

export class FeedPublicationComponent implements OnInit, OnDestroy {

  // input
  @Input() space: string

  // get the profil
  myprofile: Observable<ProfileModel>
  profile: ProfileModel
  pictureProfile: String

  // DECLARATION LOGIC
  feedPublicationForm: FormGroup
  publicationType: string

  // DECLARATION ANIMATION
  firstcard = false
  logo_rotation = false
  imageSrc: string
  filePath: any
  imgURL: any
  imgPath: String
  videoURL: any
  videoPath: String
  buttonturned = false
  postervideo: any
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
  publicationToSend: PostPublication
  videoType: any

  // upload
  uploadVideo = 0
  uploadPicture = 0
  pictureUrl: string
  videoUrl: string
  uploadPictureSub: Subscription
  uploadVideoSub: Subscription

  // add friend
  searchField: FormControl
  resultsProfile$: Observable<ProfileModel[]>
  friendTagged: ProfileModel[] = []
  listProfilTagged: boolean

  // hastag
  hastagList: string[]
  @ViewChild('hastagContent', { static: false }) hastagContent: ElementRef;

  constructor(
    private store$: Store<RootStoreState.State>,
    private sanatizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private imageCompress: NgxImageCompressService,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService,
  ) { }

  // get the form
  get f() { return this.feedPublicationForm.controls }

  ngOnInit(): void {

    // get the profile
    this.myprofile = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile)
    )

    // We initialize the form
    this.feedPublicationForm = this.formBuilder.group({})

    // search friends input
    this.searchField = new FormControl()
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged())

    // to search the friends profile
    this.searchField.valueChanges
      .pipe(
        filter(value => value !== undefined || value !== ''),
        filter(value => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => {
        this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'feed_publication'))
      })

    // to select the profile
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      skipWhile(val => val === null),
    )

  }

  // open the form
  openpublication(): void {
    this.firstcard = !this.firstcard
    this.buttonturned = !this.buttonturned
  }

  // close
  closepublication(): void {
    this.firstcard = !this.firstcard;
    this.buttonturned = !this.buttonturned
    this.activeZone = 'none'
    this.feedPublicationForm.reset();
    this.hastagList = []
  }

  // change the color of the background for the post
  changebackground(backgroundchoice: string): void {
    this.background = backgroundchoice
  }

  // open post mode
  postmode(): void {
    this.publicationType = 'post'
    this.activeZone = 'postzone'
    this.background = this.defaultbackground
    this.updateForm(this.publicationType)
  }

  // open the picture or video mode
  preview(files: any): void | MatSnackBarRef<SimpleSnackBar> {

    if (files.length === 0) return null

    if (files[0].size > 50000000) return this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.file-over-50mb'),
      this.translate.instant('CORE.close'),
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )

    // get the file
    const reader = new FileReader()
    reader.onloadend = _event => {

      // open the picture mode
      if (files[0].type.match('image')) {
        this.imgURL = reader.result;
        this.imgPath = files[0].name;
        this.activeZone = 'imgzone'
        this.publicationType = 'picture';
        this.updateForm(this.publicationType)
        this.uploadFileAndCompress(environment.link_feed_publication_image, files[0], reader.result)
      }

      // open the video mode
      if (files[0].type.match('video')) {
        const blob = new Blob([reader.result], { type: files[0].type })
        const url = URL.createObjectURL(blob)
        this.videoURL = this.sanatizer.bypassSecurityTrustResourceUrl(url)
        this.videoType = files[0].type
        this.videoPath = files[0].name
        this.activeZone = 'videozone'
        this.publicationType = 'video'
        this.updateForm(this.publicationType)
        this.uploadFile(environment.link_feed_publication_video, files[0], reader.result)
      }

    }

    // read the file
    if (files[0].type.match('image')) reader.readAsDataURL(files[0])
    if (files[0].type.match('video')) {

      // check the duration before the upload
      var video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)

        // if it's inferior than 30
        if (video.duration > 31) {
          return this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.not-more-than-30-sec-in-this-space'),
            this.translate.instant('CORE.close'), {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          })
        }
        // if it's superior than 30
        else {
          reader.readAsArrayBuffer(files[0])
        }
      }
      video.src = URL.createObjectURL(files[0]);


    }

  }

  // add a poster for video
  previewposter(files: any): void | MatSnackBarRef<SimpleSnackBar> {

    if (files.length === 0) return null

    // get the file
    const reader = new FileReader()

    // compress the file
    reader.onloadend = _event => {
      this.postervideo = reader.result
      this.postedposter = true
      this.editedposter = true
      setTimeout(() => this.editedposter = false, 3000)
      this.uploadFileAndCompress(environment.link_feed_publication_poster, files[0], reader.result)
    }

    // read the file
    reader.readAsDataURL(files[0])

  }

  // send the new publication
  createFeedPublication(): void {

    // build the publications
    const publication: FeedPublication = this.constructPublication()

    // check if the publications is valid
    if (this.checkVerification(publication.type) == false) return null

    // send the publications
    else this.sendPublication(publication)
  }

  // check verification
  checkVerification(type: string): Boolean {
    switch (type) {
      case 'PostPublication':
        if (this.feedPublicationForm.controls.text.status == 'INVALID') {
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.els-ar-missing'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          return false
        }
        else return true
      case 'PicturePublication':
        if (this.uploadPicture !== 100) {
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.Please-wait-for-the-upload-to-complete'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          return false
        }
        if (!this.pictureUrl) {
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          return false
        }
        else return true
      case 'VideoPublication':
        if (!this.pictureUrl) {
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.Please-upload-the-poster-before'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          return false
        }
        if (this.uploadPicture !== 100 || this.uploadVideo !== 100) {
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.Please-wait-for-the-upload-to-complete'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          return false
        }
        if (!this.videoUrl) {
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          return false
        }
        else return true
    }
  }

  // finaly post the publications
  sendPublication(publication:FeedPublication): void {
    this.addInStore(publication)
    this.firstcard = !this.firstcard
    this.buttonturned = !this.buttonturned
    this.activeZone = 'none'
    this.feedPublicationForm.reset()
    this.hastagList = []
  }

  // add in the store
  addInStore(publication:FeedPublication): void {
    this.store$.dispatch(new FeedPublicationStoreActions.AddFeedPublication(publication))
  }

  // Update for each type of publication
  updateForm(modeForm: string): void {
    switch (modeForm) {
      case 'post': {
        this.feedPublicationForm.addControl('type', this.formBuilder.control('PostPublication', Validators.required));
        this.feedPublicationForm.addControl('background', this.formBuilder.control(this.background, Validators.required));
        this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
        break;
      }
      case 'picture': {
        this.feedPublicationForm.addControl('file', this.formBuilder.control(this.imgPath, Validators.required));
        this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
        break;
      }
      case 'video': {
        this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
        this.feedPublicationForm.addControl('file', this.formBuilder.control(this.videoPath, Validators.required));
        this.feedPublicationForm.addControl('poster', this.formBuilder.control(this.postervideo, Validators.required));
        break;
      }
    }
  }

  // Choose type of card
  constructPublication(): FeedPublication {

    // add the friends tagged
    let listIdTagged = null
    if (this.friendTagged.length !== 0) { listIdTagged = this.friendTagged.map(x => x._id) }

    // construct the publications
    switch (this.publicationType) {
      case 'post': return new PostPublication(this.hastagList, listIdTagged, this.background, this.feedPublicationForm.get('text').value, 'profile')
      case 'picture': return new PicturePublication(this.hastagList, listIdTagged, this.pictureUrl, this.feedPublicationForm.get('text').value, 'profile')
      case 'video': return new VideoPublication(this.hastagList, listIdTagged, this.feedPublicationForm.get('text').value, this.videoUrl, this.pictureUrl, 'profile')
      default: return null
    }

  }

  // option tag
  tagAdded(profile: ProfileModel): void {
    this.friendTagged.push(profile)
  }

  // delete a friend in the list
  deleteTag(profile: ProfileModel): void {
    this.friendTagged = this.friendTagged.filter(obj => obj != profile)
  }

  // show the dropdown
  showListTagged(): void {
    this.listProfilTagged = true
  }

  // unsubscribe all the var
  ngOnDestroy(): void {
    if (this.uploadPictureSub) this.uploadPictureSub.unsubscribe()
    if (this.uploadVideoSub) this.uploadVideoSub.unsubscribe()
  }

  // add hastag
  addHastag() {

    // intialize the arraylist if it's not exist
    if (!this.hastagList) this.hastagList = []

    // not more than 5 hastag
    if (this.hastagList.length >= 5) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.not-more-5-hastags'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }

    // check if we already have the same
    if (!this.hastagList.indexOf(String(this.hastagContent.nativeElement.value))) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.T-hashtag-is-already-there'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }

    // push in the list
    this.hastagList.push(this.hastagContent.nativeElement.value)

    // reset the search 
    this.hastagContent.nativeElement.value = null

  }

  // delete an hastag
  removeHastag(hastag: string) {
    this.hastagList.splice(this.hastagList.indexOf(hastag), 1)
  }

  // check if the keyboard touch is valid
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
    switch (type) {
      case 'video':
        switch (event.type) {
          case  HttpEventType.UploadProgress: { this.uploadVideo = Math.round((100 * event.loaded) / event.total); break }
          case HttpEventType.Response: { this.updateUrl(urlSigned.Bucket, urlSigned.Key, type); break }
          default: break
        }
        return null
      case 'image':
        switch (event.type) {
          case HttpEventType.UploadProgress: { this.uploadPicture = Math.round((100 * event.loaded) / event.total); break }
          case HttpEventType.Response: { this.updateUrl(urlSigned.Bucket, urlSigned.Key, type); break }
          default: break
        }
        return null
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
