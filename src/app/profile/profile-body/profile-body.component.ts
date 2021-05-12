import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { ReportModalComponent } from 'src/app/core/modal/report-modal/report-modal.component';
import { ValidationsComponent } from 'src/app/core/modal/validations/validations.component';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { FeedPublicationStoreActions, FriendsRequestFeatureStoreActions, ProfileFeatureStoreActions, ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store';
import { slideInProfile } from 'src/assets/route-animation/profile-animation';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss'],
  animations: [slideInProfile]
})

export class ProfileBodyComponent implements OnInit, OnDestroy {

    // get the user page
    profile: ProfileModel;
    profile$: Observable<ProfileModel>;
  
    // router
    routerSub: Subscription;
    saveUrl: string;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    // listener for the route
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const baseUrl = event.url.split('/')[1];
        const idUrl = event.url.split('/')[2];

        if ((baseUrl == 'profile') && (this.saveUrl !== idUrl)) {
          this.loadPageProfile();
          this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed);
          this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'profile/' + idUrl));
          this.saveUrl = this.route.snapshot.paramMap.get('id');
        }
      });

    this.loadPageProfile();

  }

  loadPageProfile() {

    // get the id profile
    this.store$.dispatch(new ProfileFeatureStoreActions.GetProfileById(this.route.snapshot.paramMap.get('id')));

    // update the url
    this.saveUrl = this.route.snapshot.paramMap.get('id');

    // to select the profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfilePage),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    );

  }

  prepareRoute(outlet: RouterOutlet) {
    // to animate the routing
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['Story']
  }

  deletefriendbtn(id: string) {
    // open the validation modal
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id, type: 'delete-friend' }
    });
  }

  askfriendbtn(profile: ProfileModel) {
    // create a friend request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.CreateFriendRequest(profile._id));
  }

  cancelfriendbtn(profile: ProfileModel) {
    // cancel the request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.DeleteFriendRequest(profile._id));
  }

  ComfirmBtn(profile: ProfileModel) {
    // confirm the request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.ConfirmFriendRequest(profile._id));
  }

  report(profile: ProfileModel): MatDialogRef<ReportModalComponent> {
    // open the modal to report the publications
    return this.dialog.open(ReportModalComponent, {
      panelClass: ['col-md-10'],
      data: { profile, type: 'profile-report' }
    });
  }


  follow(id: string) {
    // follow the profile
    this.store$.dispatch(new ProfileFeatureStoreActions.FollowProfile(id));
  }

  unfollow(id: string) {
    // unfollow the profile
    this.store$.dispatch(new ProfileFeatureStoreActions.UnFollowProfile(id));
  }


  ngOnDestroy(): void {
    // unsubscribe all var
    this.routerSub.unsubscribe();
  }

}
