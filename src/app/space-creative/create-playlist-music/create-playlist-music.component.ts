import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, MusicByIdStoreActions, PlaylistMusicByIdStoreSelectors, PlaylistMusicByIdStoreActions, MusicByIdStoreSelectors } from 'src/app/root-store';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { Music } from 'src/app/core/models/publication/music/music.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Playlist } from 'src/app/core/models/music/playlist.model';
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-playlist-music',
  templateUrl: './create-playlist-music.component.html',
  styleUrls: ['./create-playlist-music.component.scss']
})

export class CreatePlaylistMusicComponent implements OnInit {

  // picture
  pictureImg: any;
  pictureUrl: string;

  // form
  playlistForm: FormGroup;
  musicsForm: FormGroup;
  inputSelected: number;
  musicId: FormControl;

  // arrayMusic
  musicList: any[];
  uploaded = false;
  loadedMusic$: Observable<Music>

  // error message
  notfounded = false;

  // playlist redirection
  playlist$: Observable<Playlist>;

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  constructor(
    private store$: Store<RootStoreState.State>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // info music playlist
    this.playlistForm = this.formBuilder.group({
      title: ['', Validators.required],
    })

    // default music playlist
    this.musicList = [
      new Music(null, null, null, null, null, null, null),
      new Music(null, null, null, null, null, null, null),
    ]

    this.musicId = new FormControl()

    // to listen the input
    this.musicId.valueChanges
      .pipe(
        filter(value => value.length === 24),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => {
        this.store$.dispatch(new MusicByIdStoreActions.LoadMusicById(val))
        this.notfounded = true
      });

    // to select the music loaded
    this.loadedMusic$ = this.store$.pipe(
      skipWhile(val => val === null),
      select(MusicByIdStoreSelectors.select),
      filter(files => !!files)
    )

    // to update the array list after to get the music
    this.loadedMusic$.subscribe((data: Music) => {
      this.addToMusicList(data);
      this.musicId.setValue('');
      this.notfounded = false;
    })

    // to select the playlist
    this.playlist$ = this.store$.pipe(
      select(PlaylistMusicByIdStoreSelectors.select),
      skipWhile(val => val === null),
    )

  }

  get f() { return this.playlistForm.controls; }

  delete(music: Music) {
    // to pull a music in the list
    this.musicList = this.musicList.filter(obj => obj !== music);
  }

  drop(event: CdkDragDrop<string[]>) {
    // to change the order of the musics
    moveItemInArray(this.musicList, event.previousIndex, event.currentIndex);
  }

  submit() {

    // check the valid info
    if (this.playlistForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.title-required'),
        null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // check the picture file
    if (!this.pictureUrl) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.music-&-file-required'),
        null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }

    // to create the playlist object
    const newPlaylist = new Playlist(this.playlistForm.get('title').value, this.pictureUrl, this.musicList.map(x => x._id))

    // to send the playlist
    this.store$.dispatch(new PlaylistMusicByIdStoreActions.CreatePlaylist(newPlaylist))

  }

  inputActif(index: number) {
    // to select an actif space
    this.inputSelected = index;
  }

  addToMusicList(m: Music) {
    // to add new line in the playlist 
    switch (null) {
      case this.musicList[0].name: this.musicList[0] = m; break;
      case this.musicList[1].name: this.musicList[1] = m; break;
      default: this.musicList.push(m); break;
    }
  }

  openCrooperMusicImg(file: Event) {

    if (!file) return null

    // to open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: 'imgMusicPlayslit' }
    })

    // to update the picture during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { this.pictureImg = null; return null }
      if (!!result.picture) { this.pictureImg = result.picture; return null }
      if (!!result.url) {  this.pictureUrl = result.url; return null }
    })

    // to unsubscribe the actions after to close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }


}