import {
  SearchProfileStoreActions, SearchProfileStoreSelectors, CurrentRoomStoreActions,
  CurrentRoomStoreSelectors, RoomByIdStoreActions
} from 'src/app/root-store';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../../core/models/baseUser/profile.model';
import { FriendsFeatureStoreState } from '../../root-store';
import { filter, debounceTime, distinctUntilChanged, skipWhile, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Room } from 'src/app/core/models/messenger/room.model';
import { StatePlarformService } from 'src/app/core/statePlarform/state-plarform.service';
import { MatDialog } from '@angular/material/dialog';
import { CardChatComponent } from '../card-chat/card-chat.component';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/core/models/baseUser/user.model';

@Component({
  selector: 'app-mini-chat',
  templateUrl: './mini-chat.component.html',
  styleUrls: ['./mini-chat.component.scss']
})

export class MiniChatComponent implements OnInit {

  // search bar
  searchField: FormControl;
  resultsProfile$: Observable<ProfileModel[]>;

  // room
  room$: Observable<Room[]>;
  chatshowed = false;
  currentChat = false;
  listUser = true;

  // dialog
  dialogChoose: string;

  // user
  user: UserModel;

  constructor(
    private store$: Store<FriendsFeatureStoreState.State>,
    private stateP: StatePlarformService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
  ) {
    this.user = activatedRoute.snapshot.data['loadedUser'];
  }

  ngOnInit() {

    // to set the search bar
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged());

    // to listen the search bar 
    this.searchField.valueChanges
      .pipe(
        filter(value => value !== undefined || value !== ''),
        filter(value => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => {
        this.store$.dispatch(new SearchProfileStoreActions.SearchFriends(val, 'miniChat'))
      });

    // to select the all the profile list
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot)),
    ).pipe(skipWhile(val => val[1] !== 'miniChat'), map(x => x[0]))

    // to load the current room
    this.store$.dispatch(new CurrentRoomStoreActions.loadCurrentRoom());

    // to select all the rooms
    this.room$ = this.store$.pipe(
      select(CurrentRoomStoreSelectors.selectCurrentRooms),
      skipWhile(val => val.length === 0),
      filter(value => value !== undefined)
    )
  }

  openChat() {
    // to show the card
    this.currentChat = true;
    this.listUser = false;
  }

  closeChat() {
    // to close the card
    this.currentChat = false;
    this.listUser = true;
  }

  choiceDialog(room: Room, event: Event): void {

    // set the position of the card
    const position = this.getPosition(event);

    // open the chat card
    const dialogRef = this.dialog.open(CardChatComponent, {
      backdropClass: '.no-backdrop',
      height: '27.5rem',
      width: '21rem',
      position: { left: position.x + 30 + 'px', top: position.y - 2350 + 'px' },
      data: { cardHeader: room.participants, currentRoom: room, myProfileID: this.user.profile, searching: false }
    });

    // to listen the card
    dialogRef.afterClosed().subscribe(() => {
      this.stateP.changeState({ mini_roomActif: null });
      this.store$.dispatch(new RoomByIdStoreActions.resetRoom())
    })

  }

  getPosition(event: any) {

    // place the card to the left side 
    let offsetLeft = 0;
    let offsetTop = 0;
    let el = event.srcElement;

    while (el) {
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.parentElement;
    }

    return { y: offsetTop, x: offsetLeft }

  }

  getRoom(profile: ProfileModel) {

    // to get the position
    const position = this.getPosition(event);
    let participants = []
    participants.push(profile)

    // to open the card modal
    const dialogRef = this.dialog.open(CardChatComponent, {
      backdropClass: '.no-backdrop',
      height: '27.5rem',
      width: '21rem',
      position: { left: position.x + 50 + 'px', top: position.y - 2300 + 'px' },
      data: { currentRoom: null, cardHeader: participants, myProfileID: this.user.profile, searching: true }
    });

    // to listen the card modal
    dialogRef.afterClosed().subscribe(() => {
      this.stateP.changeState({ mini_roomActif: null });
      this.searchField.setValue('');
      this.store$.dispatch(new RoomByIdStoreActions.resetRoom())
    })

  }

}
