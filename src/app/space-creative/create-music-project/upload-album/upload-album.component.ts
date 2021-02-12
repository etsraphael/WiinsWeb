import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms'
import { Music } from 'src/app/core/models/publication/music/music.model'
import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { select, Store } from '@ngrx/store'
import { RootStoreState, MusicProjectStoreActions, MusicProjectStoreSelectors } from 'src/app/root-store'
import { Observable, Subscription } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component'
import * as uuid from 'uuid'
import { HttpEventType, HttpEvent } from '@angular/common/http'
import { UrlSigned, UploadService, RespondGetUploadUrl } from 'src/app/core/services/upload/upload.service'
import { UploadWithoutInjectorService } from 'src/app/core/services/upload/upload-without-injector.service'
import { environment } from 'src/environments/environment'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CreditMusicComponent, MusicCredit } from 'src/app/core/modal/credit-music/credit-music.component'
import { filter, skipWhile } from 'rxjs/operators'
import * as _ from 'lodash'
import { MusicCreditModel } from 'src/app/core/models/music/music-credit.model'

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
  submited = false

  // object
  oneMusic: Music
  album: MusicProject

  // upload
  musicUrl: string[] = []
  loadingMusic: boolean[] = []

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  // credit
  musicCredit: MusicCreditModel[] = []

  // store
  loading$: Observable<boolean>

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

    // to set 2 default music
    this.musicCredit.push(new MusicCreditModel(null),new MusicCreditModel(null))
    this.music.push(this.formBuilder.group({ name: ['', Validators.required] }))
    this.music.push(this.formBuilder.group({ name: ['', Validators.required] }))

    // to select loading
    this.loading$ = this.store$.pipe(
      select(MusicProjectStoreSelectors.selectMusicProjectIsLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  get f() { return this.albumForm.controls }
  get music() { return this.f.musics as FormArray }

  majorValidator(control: AbstractControl) {
    // to get a date superior than yesterday
    if (control.value !== null) {
      let d = new Date();
      d.setDate(d.getDate()-1);
      const diff = (d.valueOf() - control.value) / (1000 * 60 * 60 * 24) / 365
      if (diff > 0) return { 'date': { valid: false } }
      else return null
    }
    return null
  }

  openCreditModal(i: number) {

    // open the modal for the id
    const dialogRef = this.dialog.open(CreditMusicComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { 
        name: this.music.value[i].name,
        index: i,
        ...this.musicCredit[i]
      }
    })

    const sub = dialogRef.componentInstance.onAdd.subscribe((data: MusicCredit) => {
      // added a music credit 
      this.musicCredit[i] = data
    })

    // unsubscribe the modal after to close the dialog
    dialogRef.afterClosed().subscribe(() => sub.unsubscribe())

  }

  addArray() {

    // to add a music
    this.music.push(this.formBuilder.group({ name: ['', Validators.required] }))

    // music credit
    this.musicCredit.push(new MusicCreditModel(null))

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
          (error: any) => null)
      },
      (error: RespondGetUploadUrl) => null
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

  submit() {

    // check the picture
    if (!this.pictureUrl) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.music-&-file-required'),
        null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // check the project size
    if (this.musicUrl.length < 2) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.2-music-min'),
        null, {
        horizontalPosition: 'center',
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

      // add the feat 
      let feat = null
      if (!!this.musicCredit[i].feat && this.musicCredit[i].feat.length !== 0) {
        feat = this.musicCredit[i].feat.filter(val => val !== null).map(x => x._id);
      }

      // add the categories 
      let categories = null
      if (!!this.musicCredit[i].categories && this.musicCredit[i].categories.length !== 0) {
        categories = this.musicCredit[i].categories.map(x => x.code)
      }

      listMusic.push(
        new Music(
          m.name,
          this.musicUrl[i],
          feat,
          this.musicCredit[i].interpreters,
          this.musicCredit[i].writters,
          this.musicCredit[i].producers,
          categories
        )
      )
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
    this.musicCredit[index].feat = this.musicCredit[index].feat.filter(x => x._id !== idProfile)
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