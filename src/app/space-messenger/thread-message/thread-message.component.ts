import { Component, OnInit, ViewChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ProfileFeatureStoreSelectors, FullRoomByIdStoreSelectors,FullRoomByIdStoreActions, SearchProfileStoreActions, SearchProfileStoreSelectors } from '../../root-store';
import { Observable, combineLatest } from 'rxjs';
import { ProfileModel } from '../../core/models/baseUser/profile.model';
import { filter, skipWhile, take, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MessageText } from 'src/app/core/models/messenger/message.model';
import { FormControl } from '@angular/forms';
import { UserModel } from 'src/app/core/models/baseUser/user.model';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/core/models/messenger/room.model';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-thread-message',
  templateUrl: './thread-message.component.html',
  styleUrls: ['./thread-message.component.scss']
})

export class ThreadMessageComponent implements OnInit {

  // profile
  myprofile$: Observable<ProfileModel>

  // room
  room$: Observable<Room>
  counterPage = 1

  // message
  text: string

  // mode
  mode = 'default'
  search = false

  // search bar
  searchField: FormControl
  listfriend: ProfileModel[]

  // add participant
  addingContainer = false
  participantAdded: ProfileModel[] = []
  resultsProfile$: Observable<ProfileModel[]>

  // ref
  @ViewChildren('messagesMain') messages: QueryList<any>;
  @ViewChild('contentMain', { static: false }) content: ElementRef;

  // my user
  user: UserModel

  constructor(
    private store$: Store<RootStoreState.State>,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.user = activatedRoute.parent.snapshot.data['loadedUser']
  }

  ngOnInit() {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile),
      skipWhile(profile => profile == null),
    );

    // to select the room
    this.room$ = this.store$.pipe(
      select(FullRoomByIdStoreSelectors.select),
    )

    // to set the searchfield
    this.searchField = new FormControl()
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(v => { if (v === '') { this.store$.dispatch(new SearchProfileStoreActions.ResetSearch) } })

    // to listen the search bar  
    this.searchField.valueChanges.pipe(
      filter(value => !!value),
      filter(value => value.length > 3),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'MainCardChat')))

    // to select the profile result
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot)),
      this.store$.pipe(
        select(FullRoomByIdStoreSelectors.selectParticipant),
        filter(data => !!data),
        skipWhile(val => val.length === 0)
      )
    ).pipe(
      skipWhile(val => val[1] !== 'MainCardChat'),
      map(val => val[0].filter(x => !(val[2].map(x => x._id)).includes(x._id))),
      map(val => val.filter(x => x._id !== this.user.profile)),
      map(val => val.filter(x => !(this.participantAdded.map(x => x._id)).includes(x._id)))
    )

  }

  changeMode(modifMode: string) {
    // to change the mode 
    this.mode = modifMode
  }

  getAvatarChat(participants: ProfileModel[], ownerID: string): string {
    // to get the avatar of each user
    return participants[participants.map(x => x._id).indexOf(ownerID)].pictureprofile
  }

  send(roomID: string) {

    // to construct the page
    const message = new MessageText('text', this.text)

    switch (roomID) {
      // first message in a new group
      case 'undefined':
        return this.create(message)
      // create a new discution
      case '':
      case null:
        return this.createWithSearch(message)
      // juste a respond
      default:
        this.store$.dispatch(new FullRoomByIdStoreActions.sendMessage(message, roomID))
        this.text = null
        return null
    }

  }

  create(message: any) {
    // to create a room
    this.room$.pipe(take(1)).subscribe(val => {
      const room = new Room(val.participants.map(x => x._id), message)
      this.store$.dispatch(new FullRoomByIdStoreActions.createRoom(room))
    })
    this.text = null
  }

  createWithSearch(message: any) {
    return null
  }

  onScrollUp() {
    // to load more message
    this.counterPage += 1
    this.room$.pipe(take(1)).subscribe(action => {
      if (action.nbMessage === action.message.length) {
        return null
      }
      this.store$.dispatch(new FullRoomByIdStoreActions.moreMessage(action._id, this.counterPage, action.nbMessage))
    })
  }

  ngAfterViewInit() {
    // to scrool at the bottom
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
        // to scrool at the bottom
    try {
      if (this.counterPage == 1) {
        this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  unMuteRoom() {
    // to unmute the room
    // this.room$.pipe(take(1)).subscribe(data => {
    //   this.store$.dispatch(new FullRoomByIdStoreActions.roomMute(data._id, 0))
    // })
    this.supportMessage()
  }

  muteRoom() {
    // to mute the room
    // this.room$.pipe(take(1)).subscribe(data => {
    //   this.store$.dispatch(new FullRoomByIdStoreActions.roomMute(data._id, 1))
    // })
    this.supportMessage()
  }

  deleteRoom(idRoom: string) {
    // to delete the room
    this.store$.dispatch(new FullRoomByIdStoreActions.deleteRoom(idRoom))
    this.mode = 'default'
  }

  toogleSearch() {
    // to show the search bar
    // this.participantAdded = []
    // this.search = !this.search
    this.supportMessage()
  }

  addParticipant(profile: ProfileModel) {
    // to add an user in the room
    // this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)
    // this.participantAdded.push(profile)
    // this.searchField.setValue('')
    this.supportMessage()
  }

  deleteParticipant(profileID: string) {
    // to pull a user in the group
    this.participantAdded.splice(this.participantAdded.map(x => x._id).indexOf(profileID), 1)
  }

  checkGroup() {

    // to see if the group already exist
    this.room$.pipe(take(1)).subscribe(val => {
      this.store$.dispatch(new FullRoomByIdStoreActions.loadRoomByIdProfiles(
        [...this.participantAdded, ...val.participants]
      ))
    })
    this.toogleSearch()
  }

  deleteMessage(roomID: string, messageID: string){
    // to delete the message
    this.store$.dispatch(new FullRoomByIdStoreActions.deleteMessage(roomID, messageID))
  }

  supportMessage(): void {
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }
}
