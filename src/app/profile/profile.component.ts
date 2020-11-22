import { ProfileFeatureStoreSelectors, RootStoreState, ProfileFeatureStoreActions, FriendsRequestFeatureStoreActions, FeedPublicationStoreActions } from 'src/app/root-store'
import { filter, skipWhile } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { ActivatedRoute, RouterOutlet, Router, NavigationEnd } from '@angular/router'
import { FeedPublication } from '../core/models/publication/feed/feed-publication.model'
import { ProfileModel } from '../core/models/baseUser/profile.model'
import { ValidationsComponent } from '../core/modal/validations/validations.component'
import { slideInProfile } from 'src/assets/route-animation/profile-animation'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideInProfile]
})

export class ProfileComponent implements OnInit, OnDestroy {

  // get the user page
  profile: ProfileModel
  profile$: Observable<ProfileModel>

  // router
  routerSub: Subscription
  saveUrl: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    // redirection if it's my profile
    this.redirectionOrLoad(
      this.route.snapshot.paramMap.get('id'), // his id
      this.activatedRoute.parent.snapshot.data['loadedUser'].profile // my id
    )

    // listener for the route
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const baseUrl = event.url.split('/')[1]
        const idUrl = event.url.split('/')[2]

        if ((baseUrl == 'profile') && (this.saveUrl !== idUrl)) {
          this.loadPageProfile()
          this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
          this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'profile/' + idUrl))
          this.saveUrl = this.route.snapshot.paramMap.get('id')
        }
      })

  }


  prepareRoute(outlet: RouterOutlet) {
    // to animate the routing
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  redirectionOrLoad(hisProfileID: string, myProfileID: string) {
    // if it's me or not
    if (hisProfileID === myProfileID) this.router.navigate(['/myprofile'])
    else this.loadPageProfile()
  }

  loadPageProfile() {

    // get the id profile
    this.store$.dispatch(new ProfileFeatureStoreActions.GetProfileById(this.route.snapshot.paramMap.get('id')))

    // update the url
    this.saveUrl = this.route.snapshot.paramMap.get('id')

    // to select the profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfilePage),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

  }

  deletefriendbtn(id: string) {
    // open the validation modal
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id, type: 'delete-friend' }
    })
  }

  askfriendbtn(profile: ProfileModel) {
    // create a friend request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.CreateFriendRequest(profile._id))
  }

  cancelfriendbtn(profile: ProfileModel) {
    // cancel the request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.DeleteFriendRequest(profile._id))
  }

  ComfirmBtn(profile: ProfileModel) {
    // confirm the request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.ConfirmFriendRequest(profile._id))
  }

  report(id: string) {
    // open the report modal
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id, type: 'profile-report' }
    })
  }

  follow(id: string) {
    // follow the profile
    this.store$.dispatch(new ProfileFeatureStoreActions.FollowProfile(id))
  }

  unfollow(id: string) {
    // unfollow the profile
    this.store$.dispatch(new ProfileFeatureStoreActions.UnFollowProfile(id))
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    this.routerSub.unsubscribe()
  }

}

