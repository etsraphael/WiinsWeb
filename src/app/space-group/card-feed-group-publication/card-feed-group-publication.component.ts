import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { environment } from 'src/environments/environment'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { PostPublication, FeedPublication, PicturePublication, VideoPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { Store, select } from '@ngrx/store'
import {
  RootStoreState, ProfileFeatureStoreSelectors, SearchProfileStoreActions,
  SearchProfileStoreSelectors, GroupFeatureStoreSelectors, FeedPublicationStoreActions
} from 'src/app/root-store'
import { DomSanitizer } from '@angular/platform-browser'
import { skipWhile, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { IconAnimation } from 'src/assets/route-animation/icon-animation'
import { GroupModel } from 'src/app/core/models/group/group.model'
import { TranslateService } from '@ngx-translate/core'
import { NgxImageCompressService } from 'ngx-image-compress'
import { UrlSigned, UploadService, RespondGetUploadUrl } from 'src/app/core/services/upload/upload.service'
import * as uuid from 'uuid';
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service'
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-card-feed-group-publication',
  templateUrl: './card-feed-group-publication.component.html',
  styleUrls: ['./card-feed-group-publication.component.scss'],
  animations: [IconAnimation]
})

export class CardFeedGroupPublicationComponent implements OnInit, OnDestroy {

  // input
  @Input() space: string

  // get the profil
  myprofile: Observable<ProfileModel>
  profile: ProfileModel
  pictureProfile: String

  // group
  groups$: Observable<GroupModel[]>
  groupSelected: GroupModel

  // DECLARATION LOGIC
  feedPublicationForm: FormGroup
  publicationType: string
  FilePoster: any

  // DECLARATION ANIMATION
  firstcard = false
  logo_rotation = false
  imageSrc: string
  imgURL: any
  videoURL: any
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

  get f() { return this.feedPublicationForm.controls }

  ngOnInit() {

    // to select all the groups
    this.groups$ = this.store$.pipe(
      select(GroupFeatureStoreSelectors.selectAllGroupStoryItems),
      skipWhile(val => val.length == 0),
      filter(value => value !== undefined),
    )

    // to select the profile
    this.myprofile = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile)
    )

    // to build the form of the publications
    this.feedPublicationForm = this.formBuilder.group({})

    // search friend
    this.searchField = new FormControl()
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged())

    // to listen the input
    this.searchField.valueChanges
      .pipe(
        filter(value => value !== undefined || value !== ''),
        filter(value => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => {
        this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'feed_publication'))
      })

    // to select the list of the profiles
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
    this.updateForm()
  }

  // open the picture or video mode
  preview(files: any): void {

    if (files.length === 0) return null

    // get the file
    const reader = new FileReader()
    reader.onloadend = _event => {
      // open the picture mode
      if (files[0].type.match('image')) {
        this.imgURL = reader.result;
        this.activeZone = 'imgzone'
        this.publicationType = 'picture';
        this.updateForm()
        this.uploadFileAndCompress(environment.link_feed_publication_image, files[0], reader.result)
      }

      if (files[0].type.match('video')) {
        const blob = new Blob([reader.result], { type: files[0].type });
        const url = URL.createObjectURL(blob);
        this.videoURL = this.sanatizer.bypassSecurityTrustResourceUrl(url);
        this.videoType = files[0].type;
        this.activeZone = 'videozone'
        this.publicationType = 'video';
        this.updateForm();
        this.uploadFile(environment.link_feed_publication_video, files[0], reader.result)
      }
    }

    if (files[0].type.match('image')) reader.readAsDataURL(files[0])
    if (files[0].type.match('video')) reader.readAsArrayBuffer(files[0])
  }

  // add a poster for video
  previewposter(files: any): void | MatSnackBarRef<SimpleSnackBar> {
    if (files.length === 0) return null

    // get the file
    const reader = new FileReader()

    reader.onloadend = _event => {
      this.postervideo = reader.result
      this.postedposter = true
      this.editedposter = true
      setTimeout(() => this.editedposter = false, 3000)
      this.uploadFileAndCompress(environment.link_feed_publication_poster, files[0], reader.result)
    }

    reader.readAsDataURL(files[0])
  }

  // send the new publication
  createFeedPublication(): void {
    let pubilcation = this.constructFeedPublication()
    if (this.checkVerification(pubilcation.type) == false) {
      this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.els-ar-missing'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )
    } else this.sendPublication(pubilcation)
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

  // finanly post the publications
  sendPublication(publication: FeedPublication): void {
    this.store$.dispatch(new FeedPublicationStoreActions.AddFeedPublication(publication))
    this.firstcard = !this.firstcard
    this.buttonturned = !this.buttonturned
    this.activeZone = 'none'
    this.feedPublicationForm.reset()
  }

  // Update for each type of publication
  updateForm(): void {
    this.feedPublicationForm.addControl('text', this.formBuilder.control('', Validators.required));
  }

  // Choose type of card
  constructFeedPublication(): FeedPublication{
    let listIdTagged = null
    if (this.friendTagged.length !== 0) { listIdTagged = this.friendTagged.map(x => x._id) }

    switch (this.publicationType) {
      case 'post': return new PostPublication(null, listIdTagged, this.background, this.feedPublicationForm.get('text').value, 'profile', null, this.groupSelected._id)
      case 'picture': return new PicturePublication(null, listIdTagged, this.pictureUrl, this.feedPublicationForm.get('text').value, 'profile', null, this.groupSelected._id)
      case 'video': return new VideoPublication(null, listIdTagged, this.feedPublicationForm.get('text').value, this.videoUrl, this.pictureUrl, 'profile', null, this.groupSelected._id)
      default: return null
    }
  }

  // option tag
  tagAdded(profile: ProfileModel): void {
    this.friendTagged.push(profile)
  }

  // pull a tag
  deleteTag(profile: ProfileModel): void {
    this.friendTagged = this.friendTagged.filter(obj => obj != profile)
  }

  // show the tag list
  showListTagged(): void {
    this.listProfilTagged = true
  }

  // to select the group
  selectGroup(group: GroupModel) {
    this.groupSelected = group
    this.activeZone = 'category-choice'
  }

  // unsubscribe all the var
  ngOnDestroy(): void {
    if (this.uploadPictureSub) this.uploadPictureSub.unsubscribe()
    if (this.uploadVideoSub) this.uploadVideoSub.unsubscribe()
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
