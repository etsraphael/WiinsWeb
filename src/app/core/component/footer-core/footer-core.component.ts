import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, skipWhile } from 'rxjs/operators';
import { CurrentRoomStoreActions, CurrentRoomStoreSelectors, FriendsFeatureStoreState, PlayerMusicStoreActions, PlayerMusicStoreSelectors, RoomByIdStoreActions } from 'src/app/root-store';
import { CardChatComponent } from 'src/app/space-messenger/card-chat/card-chat.component';
import { ProfileModel } from '../../models/baseUser/profile.model';
import { UserModel } from '../../models/baseUser/user.model';
import { Room } from '../../models/messenger/room.model';
import { Music } from '../../models/publication/music/music.model';
import { ControlMusicService } from '../../services/control-music/control-music.service';
import { StatePlarformService } from '../../statePlarform/state-plarform.service';

@Component({
  selector: 'app-footer-core',
  templateUrl: './footer-core.component.html',
  styleUrls: ['./footer-core.component.scss']
})

export class FooterCoreComponent implements OnInit {

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

  // music
  audio$: Observable<Music>

  constructor(
    private store$: Store<FriendsFeatureStoreState.State>,
    private stateP: StatePlarformService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    public controlMusicService: ControlMusicService
  ) {
    this.user = activatedRoute.snapshot.data['loadedUser']
  }

  ngOnInit() {
    this.displayCurrentRooms()
    this.playerListener()
  }

  displayCurrentRooms() {
    // to load the current room
    this.store$.dispatch(new CurrentRoomStoreActions.loadCurrentRoom());

    // to select all the rooms
    this.room$ = this.store$.pipe(
      select(CurrentRoomStoreSelectors.selectCurrentRooms),
      skipWhile(val => val.length === 0),
      filter(value => value !== undefined)
    )
  }

  openChat(room: Room, event: Event): void {

    // set the position of the card
    const offsetLeft = this.getPosition(event);

    // open the chat card
    const dialogRef = this.dialog.open(CardChatComponent, {
      backdropClass: '.no-backdrop',
      height: '27.5rem',
      width: '21rem',
      // position: { left: position.x + 30 + 'px', top: position.y - 50 + 'px' },
      position: { left: offsetLeft + 'px', bottom: '4.5rem' },
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
    let el = event.srcElement;

    while (el) {
      offsetLeft += el.offsetLeft;
      el = el.parentElement;
    }

    return offsetLeft

  }

  supportMessage() {
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }

  playerListener() {
    // to know is a music is playing
    this.audio$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying),
      distinctUntilChanged(),
      filter(value => value !== undefined),
    )
  }

}
