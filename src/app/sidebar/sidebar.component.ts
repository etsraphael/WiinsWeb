import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Music } from '../core/models/publication/music/music.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlayerMusicStoreSelectors } from '../root-store';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { IconAnimation } from 'src/assets/route-animation/icon-animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [IconAnimation]
})

export class SidebarComponent implements OnInit {

  // default
  menuItems = [
    { path: '/SpaceStory', title: 'SIDEBAR-HOME.Feed', icon: 'nav-feed-icon', class: '' },
    { path: '/SpaceDiscover/#', title: 'SIDEBAR-HOME.Discover', icon: 'nav-discover-icon', class: '' },
    { path: '/SpaceMusic', title: 'SIDEBAR-HOME.Music', icon: 'nav-music-icon', class: '' },
    { path: '/SpaceTube', title: 'SIDEBAR-HOME.Tube', icon: 'nav-tube-icon', class: '' },
    { path: '/Messenger', title: 'SIDEBAR-HOME.Messenger', icon: 'nav-messenger-icon', class: '' },
    { path: '/SpaceGroup', title: 'SIDEBAR-HOME.Group', icon: 'nav-group-icon', class: '' },
  ]

  // music
  audio$: Observable<Music>

  // donation
  donationDisplay = false

  constructor(
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {

    // to know is a music is playing
    this.audio$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying),
      distinctUntilChanged(),
      filter(value => value !== undefined),
    )
  }

  showDonation(val: boolean): void {
    // to show the pop up
    this.donationDisplay = val
  }

}
