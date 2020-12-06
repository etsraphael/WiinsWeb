import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MusicProjectStoreActions, MusicProjectStoreSelectors, PlayerMusicStoreSelectors, MyMusicLikedStoreActions, ProfileFeatureStoreSelectors } from 'src/app/root-store'
import { Observable, Subscription } from 'rxjs'
import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { skipWhile, filter, distinctUntilChanged, take } from 'rxjs/operators'
import { Music } from 'src/app/core/models/publication/music/music.model'
import { ContentIdComponent } from 'src/app/core/modal/content-id/content-id.component'
import { ControlMusicService } from 'src/app/core/services/control-music/control-music.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms'
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component'
import { PasswordValidationsComponent } from 'src/app/core/modal/password-validations/password-validations.component'
import { PasswordValidationComponent } from 'src/app/core/modal/password-validation/password-validation.component'
import { DatePipe } from '@angular/common'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'

@Component({
  selector: 'app-profile-music',
  templateUrl: './profile-music.component.html',
  styleUrls: ['./profile-music.component.scss']
})

export class ProfileMusicComponent implements OnInit {

  // project music
  musicProject$: Observable<MusicProject[]>
  myMusicProject$: Observable<MusicProject[]>

  // controls music
  musicPlaying$: Observable<Boolean>
  audioPlaying$: Observable<Music>
  musicUrlPlaying: string = null

  // edit
  editNameMusic: string
  imgPlaylist: any
  setPlaylistId: string
  titleSetting: string
  dateVisibilitySitting: string
  dateControl: FormControl

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  // profile
  myprofile$: Observable<ProfileModel>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    public controlMusicService: ControlMusicService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    // get my project or the project of the profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
    )

    this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
      if (this.router.url.split('/')[2] == profile._id) { this.loadMyProjectProfile() }
      else { this.loadProjectProfile() }
    })

    // to select the publications music
    this.musicProject$ = this.store$.pipe(
      select(MusicProjectStoreSelectors.selectAllMusicProjectItems),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to know if a playlist is selected
    this.musicPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectIfPlaying),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to know if a music is playing
    this.audioPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying),
      distinctUntilChanged(),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

  }

  loadMyProjectProfile(): void {
    this.store$.dispatch(new MusicProjectStoreActions.LoadMusicProjectByMyProfile)

    // to select the publications music
    this.myMusicProject$ = this.store$.pipe(
      select(MusicProjectStoreSelectors.selectAllMusicProjectItems),
      skipWhile(val => val.length === 0),
      filter(value => value !== undefined),
    )

    // to valid the date
    this.dateControl = this.fb.control('', [Validators.required, this.majorValidator()])
  }

  loadProjectProfile(): void {
    // to load the publications music
    this.store$.dispatch(new MusicProjectStoreActions.LoadMusicProjectByProfile(this.route.parent.snapshot.paramMap.get('id')))
  }

  getId(id: string) {
    // open the modal for the id // COPY PAST TO DO..
    this.dialog.open(ContentIdComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id }
    })
  }

  like(music: Music, musicProjectId: string) {

    // like the music
    if (music.isLiked == false) {
      this.store$.dispatch(new MyMusicLikedStoreActions.LikeMusic(music))
      this.store$.dispatch(new MusicProjectStoreActions.UpdateMusicLike(music, musicProjectId))
    }
    // dislike the music
    else {
      this.store$.dispatch(new MyMusicLikedStoreActions.DisLikeMusic(music))
      this.store$.dispatch(new MusicProjectStoreActions.UpdateMusicDisLike(music, musicProjectId))
    }
  }

  majorValidator(): ValidatorFn {
    // to check if the date is superior than today
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== '') {
        const diff = (Date.now().valueOf() - control.value) / (1000 * 60 * 60 * 24) / 365;
        if (diff < 0) { return { 'dateValid': { valid: true } } }
        else { return { 'dateValid': { valid: false } } }
      }
      return { 'dateValid': { valid: false } }
    }
  }

  changeVisibilityDate(musicProjectId: string) {
    // to set a new date 
    this.dateVisibilitySitting = musicProjectId
  }

  changeTitle(musicProjectId: string) {
    // to set a new name 
    this.titleSetting = musicProjectId
  }

  setMusic(id: string): void {
    // to show the setting design 
    this.editNameMusic = id
  }

  previewImg(file: any) {

    // open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: 'musicImg' }
    })

    // to update the picture during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { this.imgPlaylist = null; return null }
      if (!!result.picture) { this.imgPlaylist = result.picture; return null }
      if (!!result.url) { this.imgPlaylist = result.url; return null }
    })

    // unsubscribe after to close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }

  settingPlaylist(playlistID: string) {
    // to show the design setting
    this.setPlaylistId = playlistID
    this.imgPlaylist = null
  }

  sendNewName(text: string, idMusic: string, idPlaylist: string) {
    // to update the name
    this.editNameMusic = null
    const music = new Music(text, null, null, idMusic, idPlaylist)
    this.store$.dispatch(new MusicProjectStoreActions.UpdateMusic(music, 'musicName'))
  }

  resetImg() {
    // to cancel the image setting
    this.imgPlaylist = null
    this.setPlaylistId = null
  }

  savePicture(id: string) {
    // to open the modal
    this.dialog.open(PasswordValidationComponent, {
      panelClass: ['col-md-4'],
      data: { id, pictureUrl: this.imgPlaylist, type: 'updateImgMusicProject' }
    })
  }

  openModalDelete(musicID: string, musicProjectId: string, size: number) {

    // to open the modal to delete the project 
    if (size == 1) {
      this.dialog.open(PasswordValidationsComponent, {
        panelClass: ['col-md-4'],
        data: { musicProjectId, type: 'deleteMusicProject' }
      })
    }
    // to open the modal to delete the music
    else {
      this.dialog.open(PasswordValidationsComponent, {
        panelClass: ['col-md-4'],
        data: { musicID, musicProjectId, type: 'deleteMusic' }
      })
    }
  }

  deleteMusicProject(musicProjectId: string) {
    // to open the modal to delete the project 
    this.dialog.open(PasswordValidationsComponent, {
      panelClass: ['col-md-4'],
      data: { musicProjectId, type: 'deleteMusicProject' }
    })
  }


  getAvailability(visibilityDate: Date): boolean {
    // to know if it's unavailable
    if (new Date(visibilityDate).getTime() > new Date().getTime()) return false
    else return true
  }

  changeName(title: string, musicProjectId: string): void {

    const musicProject = new MusicProject(null, null, null, null, title, musicProjectId)
    this.store$.dispatch(new MusicProjectStoreActions.UpdateMusicProject(musicProject))

    // to reset the name
    this.titleSetting = null

  }

  changeDateModal(musicProjectId: string) {

    if (!this.dateControl.errors.dateValid.valid) { return null }
    const dateChanged = this.datepipe.transform(this.dateControl.value, 'yyyy-MM-dd')

    // to open the modal
    this.dialog.open(PasswordValidationsComponent, {
      panelClass: ['col-md-4'],
      data: { musicProjectId, dateChanged, type: 'changeDateMusicProject' }
    })

    // to select the response
    let musicProject = this.store$.pipe(
      select(MusicProjectStoreSelectors.selectMusicProjectState),
      skipWhile(val => val === null),
    )

    // to update after the response
    musicProject.subscribe(val => {
      if (val && val.categorie == 'valid-password') {
        this.resetDateSetting()
      }
    })

  }

  resetDateSetting() {
    // to reset the date
    this.dateVisibilitySitting = null
  }

}
