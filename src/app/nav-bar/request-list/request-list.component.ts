import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import {
  RootStoreState, FriendsRequestFeatureStoreActions, FriendsRequestFeatureStoreSelectors,
  NotificationNumberStoreSelectors, NotificationNumberStoreActions
} from '../../root-store'
import { skipWhile, take, filter } from 'rxjs/operators'
import { RequestProfile } from 'src/app/core/models/request/request.model'

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})

export class RequestListComponent implements OnInit {

  // request list
  requestList$: Observable<RequestProfile[]>;
  isLoading$: Observable<Boolean>;

  // notification request
  numberNewRequest$: Observable<number>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {

    // requestlist
    this.requestList$ = this.store$.pipe(
      select(FriendsRequestFeatureStoreSelectors.selectAllFriendsRequest),
      skipWhile(val => val === null)
    )

    // number new request
    this.numberNewRequest$ = this.store$.pipe(
      select(NotificationNumberStoreSelectors.selectNumberRequest),
      skipWhile(val => val === null)
    )

    // is loading
    this.isLoading$ = this.store$.pipe(
      select(FriendsRequestFeatureStoreSelectors.selectIsLoading),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )

  }

  initialiseRequest() {

    // reset the number of request after seen
    this.numberNewRequest$.pipe(take(1)).subscribe(number => {
      if (number > 0) this.store$.dispatch(new NotificationNumberStoreActions.InitilizeNumberRequest())
    })

  }

  acceptFriend(profileId: string) {
    // confirm the friend request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.AcceptFriendRequest(profileId));
  }

  refuseFriend(profileId: string) {
    // cancel the friend request
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.RejectFriendRequest(profileId));
  }

  confirmGroup(id: string) {
    // confirm the groupe request 
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.ConfirmGroupRequest(id));
  }

  refuseGroup(id: string) {
    // cancel the groupe request 
    this.store$.dispatch(new FriendsRequestFeatureStoreActions.RefuseGroupRequest(id));
  }

}
