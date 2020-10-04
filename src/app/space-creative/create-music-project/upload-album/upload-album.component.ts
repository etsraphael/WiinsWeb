import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms'
import { Music } from 'src/app/core/models/publication/music/music.model'
import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, SearchProfileStoreActions, SearchProfileStoreSelectors, MusicProjectStoreActions } from 'src/app/root-store'
import { Observable, Subscription } from 'rxjs'
import { filter, skipWhile, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component'
import * as uuid from 'uuid'
import { HttpEventType, HttpEvent } from '@angular/common/http'
import { UrlSigned, UploadService, RespondGetUploadUrl } from 'src/app/core/services/upload/upload.service'
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-upload-album',
  templateUrl: './upload-album.component.html',
  styleUrls: ['./upload-album.component.scss']
})

export class UploadAlbumComponent implements OnInit, OnDestroy {

  // upload
  pictureUrl: string
  uploadMusicSub: Subscription

  // picture
  filePicturePath: any
  pictureImg: any

  // form
  albumForm: FormGroup
  indexMusicStart = 2
  featArray: any[] = []
  submited = false

  // object
  oneMusic: Music
  album: MusicProject

  // search bar
  searchField: FormControl
  resultsProfile$: Observable<ProfileModel[]>

  // upload
  musicUrl: string[] = []
  loadingMusic: boolean[] = []

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog,
    private uploadService: UploadService,
    private uploadService2: UploadWithoutInjectorService
  ) { }

  ngOnInit() {

    // info of the album
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required],
      dateVisibility: ['', [Validators.required, this.majorValidator]],
      musics: new FormArray([])
    })

    // search bar
    this.searchField = new FormControl()

    // to listen the input
    this.searchField.valueChanges
      .pipe(
        filter(value => value !== undefined || value !== ''),
        filter(value => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'album')))

    // to select the profile list 
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      skipWhile(val => val === null),
    )

    // to set 2 default music
    this.featArray.push([], [])
    this.music.push(this.formBuilder.group({ name: ['', Validators.required] }))
    this.music.push(this.formBuilder.group({ name: ['', Validators.required] }))

  }

  get f() { return this.albumForm.controls }
  get music() { return this.f.musics as FormArray }

  majorValidator(control: AbstractControl) {
    // to get a date superior than today
    if (control.value !== null) {
      const diff = (Date.now().valueOf() - control.value) / (1000 * 60 * 60 * 24) / 365
      if (diff > 0) return { 'date': { valid: false } }
      else return null
    }
    return null
  }

  addArray() {

    // to add a music
    this.music.push(this.formBuilder.group({ name: ['', Validators.required] }))

    // musicFeat
    this.featArray.push([])

  }

  delete(item: number) {
    // delete a music at an index
    this.music.removeAt(item);
    this.musicUrl.splice(item, 1)
    this.loadingMusic[item] = false
  }

  addMusicUpload(event: EventTarget, indexRows: number) {

    if (event == null) return null

    // show the loading index
    this.loadingMusic[indexRows] = true

    // to upload the file to s3
    this.uploadOneMusic(event, indexRows)

  }


  uploadOneMusic(event: EventTarget, index: number) {

    let eventObj: MSInputMethodContext = <MSInputMethodContext>event
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target
    let file: File = target.files[0]

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
        this.uploadMusicSub = this.uploadService.uploadfileAWSS3(response.url, file).subscribe(
          (response: HttpEvent<{}>) => this.updateProgress(response, urlSigned, index),
          (error: any) => console.log(error))
      },
      (error: RespondGetUploadUrl) => console.log(error)
    )

  }

  // to update the loading bar
  updateProgress(event: HttpEvent<{}>, urlSigned: UrlSigned, index: number): void {
    switch (event.type) {
      case HttpEventType.Response: { this.updateUrl(urlSigned.Bucket, urlSigned.Key, index); break; }
      default: break
    }
  }

  // update the url
  updateUrl(bucketName: string, key: string, index: number): void {
    this.musicUrl[index] = this.uploadService.getFileUrlAfterUpload(bucketName, key)
    this.loadingMusic[index] = false
  }

  featAdded(item: number, profile: ProfileModel) {
    // added a profile in a music
    const indexProfile = this.featArray[item].length
    this.featArray[item][indexProfile] = profile
    this.searchField.setValue('')
  }

  submit() {

    // check the picture
    if (!this.pictureUrl) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.music-&-file-required'),
        null, {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // check the project size
    if (this.musicUrl.length < 2) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.2-music-min'),
        null, {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // check the valid infrmation
    if (this.albumForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'),
        this.translate.instant('CORE.close'), {
        duration: 5000,
      })
    }

    // create each music
    let listMusic: Music[] = []
    for (let [i, m] of this.music.value.entries()) {
      let feat = null
      if (this.featArray[i].length !== 0) {
        feat = this.featArray[i].filter(val => val !== null).map(x => x._id);
      }
      listMusic.push(new Music(m.name, this.musicUrl[i], feat))
    }

    // create the publications music object
    const musicProject = new MusicProject(
      this.albumForm.get('dateVisibility').value,
      null,
      listMusic,
      this.pictureUrl,
      this.albumForm.get('title').value,
    )

    // send the project 
    this.store$.dispatch(new MusicProjectStoreActions.AddMusicProject(musicProject))

  }

  deleteFeat(idProfile: string, index: number) {
    // pull a user in a music
    let update = this.featArray[index].filter(x => x._id !== idProfile)
    this.featArray[index] = update
  }

  openCrooperMusicImg(file: Event) {

    // open the crooper modal
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

    // unsubscribe after to close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }

  // unsubscribe all var
  ngOnDestroy(): void {
    if (this.uploadMusicSub) this.uploadMusicSub.unsubscribe()
  }

}