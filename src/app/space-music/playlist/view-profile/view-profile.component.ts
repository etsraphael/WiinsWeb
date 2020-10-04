import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlayerMusicStoreSelectors, ProfileFeatureStoreActions, ProfileFeatureStoreSelectors } from 'src/app/root-store';
import { skipWhile, filter } from 'rxjs/operators';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})

export class ViewProfileComponent implements OnInit, OnDestroy {

  // playlist
  musicPlaying$: Observable<Boolean>;
  musicPlayingSubscribe: Subscription;
  artistPlaying$: Observable<string>;
  artistPlayingSubscribe: Subscription;
  artist$: Observable<ProfileModel>

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {

    // to know if a music is playing
    this.musicPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectIfPlaying),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to select the artist is playling
    this.musicPlayingSubscribe = this.musicPlaying$.subscribe(action => {
      if (action) {
        this.artistPlaying$ = this.store$.pipe(
          select(PlayerMusicStoreSelectors.selectArtistPlaying),
          skipWhile(val => val === null),
          filter(value => value !== undefined),
        );

        this.artistPlayingSubscribe = this.artistPlaying$.subscribe(action => {
          this.loadArtist(action);
        })
      }
    })

  }

  loadArtist(pseudo: string) {

    // to load the artist
    this.store$.dispatch(new ProfileFeatureStoreActions.GetProfileByPseudo(pseudo));

    // to select the artist
    this.artist$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfilePage),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

  }

  ngOnDestroy(): void {
    // unsubscribe all var
    this.musicPlayingSubscribe.unsubscribe()
    if(this.artistPlayingSubscribe) this.artistPlayingSubscribe.unsubscribe()
  }

}
