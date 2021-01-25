import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MusicProjectStoreActions, SearchProfileStoreActions, SearchProfileStoreSelectors } from 'src/app/root-store'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { filter, debounceTime, distinctUntilChanged, skipWhile, map } from 'rxjs/operators'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { Music } from 'src/app/core/models/publication/music/music.model'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component'
import { UrlSigned, UploadService, RespondGetUploadUrl } from 'src/app/core/services/upload/upload.service'
import * as uuid from 'uuid'
import { environment } from 'src/environments/environment'
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service'
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'
import { CreditMusicComponent, MusicCredit } from 'src/app/core/modal/credit-music/credit-music.component'
import { NameAndCode } from 'src/app/core/data/music-genre'

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.scss']
})

export class UploadMusicComponent implements OnInit, OnDestroy {

  // upload
  musicUploaded: ArrayBuffer | String
  uploadSub: Subscription
  loadingProgress: number
  musicUrl: string
  pictureUrl: string
  musicType: string
  fileName: string

  // form
  musicForm: FormGroup
  musicAdded: string

  // picture
  filePicturePath: any

  // search bar
  resultsProfile$: Observable<ProfileModel[]>
  searchField: FormControl

  // feat 
  featArray: ProfileModel[] = []

  // visual
  pictureImg: any

  // profile
  myProfileID: string

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  // credit
  musicCredit: MusicCredit

  constructor(
    private store$: Store<RootStoreState.State>,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService
  ) { }

  ngOnInit() {

    // to get my profile id
    this.myProfileID = this.activatedRoute.parent.parent.parent.snapshot.data['loadedUser'].profile

    // form of the music info
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      dateVisibility: ['', [Validators.required, this.majorValidator]],
    })

    // search the profile
    this.searchField = new FormControl()

    // to listen the input
    this.searchField.valueChanges.pipe(
      filter(value => value !== undefined),
      filter(value => value !== ''),
      filter(value => value.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'SingleMusic')))

    // to select the suggestions profile
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot))
    ).pipe(skipWhile(val => val[1] !== 'SingleMusic'), map(val => val[0]))

  }

  openCreditModal() {

    // open the modal for the id
    const dialogRef = this.dialog.open(CreditMusicComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { 
        name: this.musicForm.get('title').value,
        index: null,
        ...this.musicCredit
      }
    })

    const sub = dialogRef.componentInstance.onAdd.subscribe((data: MusicCredit) => {
      // added a music credit 
      this.musicCredit = data
    })

    // unsubscribe the modal after to close the dialog
    dialogRef.afterClosed().subscribe(() => sub.unsubscribe())

  }

  get f() { return this.musicForm.controls }

  previewLink(files: any) {

    if (files.length === 0) return null

    // to get the file
    const reader = new FileReader()

    // to upload the file to s3
    reader.onloadend = (_event: Event) => {
      this.uploadOneMusic(reader.result, files[0])
    }

    // to read the file
    reader.readAsDataURL(files[0])
  }

  uploadOneMusic(result: ArrayBuffer | String, file: File) {

    // to show the music
    this.musicUploaded = result
    this.musicType = file.type    
    this.fileName = file.name

    // create the object to get the signed url from the backend
    const urlSigned: UrlSigned = {
      Bucket: environment.link_music,
      Key: uuid.v4(),
      ContentType: file.type
    }

    // to get the s3 signed url
    this.uploadService2.getSignedUrl(urlSigned).subscribe(
      (response: RespondGetUploadUrl) => {
        // upload to s3
        this.uploadSub = this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned),
          (error: any) => console.log(error))
      },
      (error: RespondGetUploadUrl) => console.log(error)
    )

  }

  // to update the loading bar
  updateProgress(event: HttpEvent<{}>, urlSigned: UrlSigned): void {
    switch (event.type) {
      case HttpEventType.Sent: { this.loadingProgress = 1; break }
      case HttpEventType.UploadProgress: { this.loadingProgress = Math.round((100 * event.loaded) / event.total); break }
      case HttpEventType.Response: { this.updateUrl(urlSigned.Bucket, urlSigned.Key); break; }
      default: break
    }
  }

  // update the url
  updateUrl(bucketName: string, key: string): void {
    this.musicUrl = this.uploadService.getFileUrlAfterUpload(bucketName, key)
  }

  submit(): void | MatSnackBarRef<SimpleSnackBar> {

    // check if we have the files
    if (this.musicUrl == null || this.pictureUrl == null) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.music-&-file-required'),
        null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // check the correct info
    if (this.musicForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'),
        null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // creating the music object
    let music: Music = null;
    music = new Music(
      this.musicForm.get('title').value,
      this.musicUrl,
      this.featArray.map(x => x._id),
      this.musicCredit.interpreters,
      this.musicCredit.writters,
      this.musicCredit.producers,
      this.musicCredit.categories.map((value: NameAndCode) => value.name)
    )

    // creating the publications music project
    const musicProject = new MusicProject(
      this.datepipe.transform(this.musicForm.get('dateVisibility').value, 'yyyy-MM-dd'),
      null,
      [music],
      this.pictureUrl
    )

    // send the publications music
    this.store$.dispatch(new MusicProjectStoreActions.AddMusicProject(musicProject))

  }

  majorValidator(control: AbstractControl) {
    // to check if the date it's after today
    if (control.value !== null) {
      const diff = (Date.now().valueOf() - control.value) / (1000 * 60 * 60 * 24) / 365
      if (diff > 0) return { 'date': { valid: false } }
      else return null
    }
    return null
  }

  addFeat(profile: ProfileModel): void | MatSnackBarRef<SimpleSnackBar> {

    // if it's already in the list
    if (this.featArray.map(x => x._id).includes(profile._id) ||
      profile._id == this.myProfileID) {
      this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.user-already-in-t-music'),
        null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })
    }

    // add the profile in the list
    else this.featArray.push(profile)

  }

  deleteFeat(id: string) {
    // pull a user in the list
    this.featArray = this.featArray.filter(data => data._id !== id)
  }

  openCrooperMusicImg(file: Event) {

    // to open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: 'musicImg' }
    })

    // to update the picture during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { this.pictureImg = null; return null }
      if (!!result.picture) { this.pictureImg = result.picture; return null }
      if (!!result.url) { this.pictureUrl = result.url; return null }
    })

    // unsubscribe actions after close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }

  ngOnDestroy(): void {
    if (this.uploadSub) this.uploadSub.unsubscribe()
  }

}