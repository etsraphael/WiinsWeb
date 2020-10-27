import { ProfileFeatureStoreSelectors, RootStoreState, NotificationNumberStoreActions, SearchProfileStoreActions, SearchPageStoreActions, MyUserStoreActions, PlayerMusicStoreActions, FeedPublicationStoreActions, FriendsRequestFeatureStoreActions, NotificationsStoreActions } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { ProfileModel } from '../core/models/baseUser/profile.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements OnInit {

  // search bar
  searchField: FormControl;

  // my profile
  myprofile$: Observable<ProfileModel>

  // search
  searching = false;

  // page
  isCollapsed = false;

  // navigation
  menuItems = [
    { path: '/SpaceStory', title: 'SIDEBAR-HOME.Feed', icon: 'nav-home-full.png', class: 'home-icon' },
    { path: '/SpaceMusic', title: 'SIDEBAR-HOME.Music', icon: 'nav-music-empty.png', class: 'music-icon' },
    { path: '/SpaceTube', title: 'SIDEBAR-HOME.Tube', icon: 'nav-message-empty.png', class: 'message-icon' },
    { path: '/Messenger', title: 'SIDEBAR-HOME.Messenger', icon: 'nav-tube-empty.png', class: 'tube-icon' },
    { path: '/SpaceGroup', title: 'SIDEBAR-HOME.Group', icon: 'nav-groups-empty.png', class: 'group-icon' },
  ]

  constructor(
    private store$: Store<RootStoreState.State>,
    public router: Router
  ) { }

  ngOnInit() {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile),
    )

    // search the profile
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(v => { if (v === '') this.searching = false })

    // listener on the navbar 
    this.searchField.valueChanges
      .pipe(
        filter(value => value !== undefined),
        filter(value => value !== ''),
        filter(value => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => {
        this.searching = true;
        this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'navbar'));
        this.store$.dispatch(new SearchPageStoreActions.SearchPage(val));
      }
    )

    // load the number of notification // ONLY ONE ACTION HERE TO DO..
    this.store$.dispatch(new NotificationNumberStoreActions.LoadNumberActivity())
    this.store$.dispatch(new NotificationNumberStoreActions.LoadNumberRequest())

  }

  closeSearchCallback() {
    // hide the suggestion bar
    this.searching = false;
    this.searchField.setValue('');
  }

  logOut() {
    // sign out the user
    this.store$.dispatch(new MyUserStoreActions.LogOut);
    this.router.navigate(['/sign/in']);
    this.store$.dispatch(new PlayerMusicStoreActions.Pause)
  }

  onClickedOutside() {
    // hide the suggestion bar
    this.searching = false
  }

  goToPage(pageId: string) {
    // redirection to the admin page
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', `page/${pageId}`))
    this.router.navigate(['/mypage/' + pageId])
  }

  loadRequestList() {
    // load friends request
    return this.store$.dispatch(new FriendsRequestFeatureStoreActions.LoadFriendRequestsToMe())
  }

  loadNotificationList() {
    // load the notification 
    return this.store$.dispatch(new NotificationsStoreActions.LoadNotifications('1'));
  }

}
