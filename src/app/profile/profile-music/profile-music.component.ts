import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MusicProjectStoreActions, MusicProjectStoreSelectors, PlayerMusicStoreSelectors, MyMusicLikedStoreActions } from 'src/app/root-store'
import { Observable } from 'rxjs'
import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model'
import { skipWhile, filter, distinctUntilChanged } from 'rxjs/operators'
import { Music } from 'src/app/core/models/publication/music/music.model'
import { ContentIdComponent } from 'src/app/core/modal/content-id/content-id.component'
import { ControlMusicService } from 'src/app/core/services/control-music/control-music.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile-music',
  templateUrl: './profile-music.component.html',
  styleUrls: ['./profile-music.component.scss']
})

export class ProfileMusicComponent implements OnInit {

  // project music
  musicProject$: Observable<MusicProject[]>

  // controls music
  musicPlaying$: Observable<Boolean>
  audioPlaying$: Observable<Music>
  musicUrlPlaying: string = null

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    public controlMusicService: ControlMusicService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    // to load the publications music
    this.store$.dispatch(new MusicProjectStoreActions.LoadMusicProjectByProfile(this.route.parent.snapshot.paramMap.get('id')))

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

  getId(id: string) {
    // open the modal for the id // COPY PAST TO DO..
    this.dialog.open(ContentIdComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id }
    })
  }

  like(music: Music, musicProjectId: string){

    // like the music
    if(music.isLiked == false){
      this.store$.dispatch(new MyMusicLikedStoreActions.LikeMusic(music))
      this.store$.dispatch(new MusicProjectStoreActions.UpdateMusicLike(music, musicProjectId))
    } 
    // dislike the music
    else {
      this.store$.dispatch(new MyMusicLikedStoreActions.DisLikeMusic(music))
      this.store$.dispatch(new MusicProjectStoreActions.UpdateMusicDisLike(music, musicProjectId))
    }
  }

}
