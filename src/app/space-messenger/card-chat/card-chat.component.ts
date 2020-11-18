import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core'
import { Room } from 'src/app/core/models/messenger/room.model'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { RootStoreState, RoomByIdStoreActions, RoomByIdStoreSelectors, CurrentRoomStoreActions, SearchProfileStoreActions, SearchProfileStoreSelectors, AllRoomsStoreActions } from 'src/app/root-store'
import { skipWhile, debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs/operators'
import { MessageText } from 'src/app/core/models/messenger/message.model'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { StatePlarformService } from 'src/app/core/statePlarform/state-plarform.service'
import { FormControl } from '@angular/forms'
import { TranslationService } from 'src/app/core/services/translation/translation.service'
import { TranslateService } from '@ngx-translate/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-card-chat',
  templateUrl: './card-chat.component.html',
  styleUrls: ['./card-chat.component.scss']
})

export class CardChatComponent implements OnInit, OnDestroy {

  // message
  text: string

  // room
  room$: Observable<Room>
  idParticipants: string[]
  roomSubscription: Subscription
  infoRoomSubscription: Subscription
  counterPage = 1
  infoRoom$: Observable<String>
  isLoading$: Observable<Boolean>

  // mode
  mode = 'default'

  // add participant
  addingContainer = false
  participantAdded: ProfileModel[] = []
  resultsProfile$: Observable<ProfileModel[]>

  // search bar
  searchField: FormControl
  listfriend: ProfileModel[]

  // reference
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(
    private stateP: StatePlarformService,
    public dialogRef: MatDialogRef<CardChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataMiniChat,
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public translateService: TranslationService,
  ) { }

  ngOnInit() {

    // to load the room by the room id
    if (this.data.currentRoom !== null) {
      this.store$.dispatch(new RoomByIdStoreActions.loadRoomById(this.data.currentRoom._id, 1, null))
      if (this.data.currentRoom.roomOption.participants[0].notification !== 0) {
        this.store$.dispatch(new CurrentRoomStoreActions.resetNotification(this.data.currentRoom._id))
        this.store$.dispatch(new AllRoomsStoreActions.resetNotification(this.data.currentRoom._id))
      }
    } 
    // to load the room by the profile id
    else { this.store$.dispatch(new RoomByIdStoreActions.loadRoomByIdProfile(this.data.cardHeader[0]._id)) }

    // to select the room
    this.room$ = this.store$.pipe(
      select(RoomByIdStoreSelectors.select),
      skipWhile(val => val === null),
      filter(val => val !== undefined),
    )

    // to show the loading animation
    this.isLoading$ = this.store$.pipe(
      select(RoomByIdStoreSelectors.selectIsLoading),
      skipWhile(val => val === null),
      filter(val => val !== undefined),
    )

    // to update the state after get the room
    this.roomSubscription = this.room$.subscribe(action => {
      this.updateState(action._id)
    })

    // to select the info room
    this.infoRoom$ = this.store$.pipe(
      select(RoomByIdStoreSelectors.selectInFo),
      filter(val => !!val),
      skipWhile(val => val === null),
    )

    // to open or create and room
    this.infoRoomSubscription = this.infoRoom$.subscribe(data => {
      switch (data) {
        case 'group-not-found':
          this.createNewRoom()
          this.participantAdded = []
          break;
        case 'group-found':
          this.participantAdded = []
          break;
      }
    })

    // to search a friends
    this.searchField = new FormControl()
    this.searchField.valueChanges.pipe(debounceTime(200),distinctUntilChanged())
    .subscribe(v=>{if(v===''){this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)}})

    // to load the friends suggestions
    this.searchField.valueChanges.pipe(
      filter(value => value.length > 3),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'cardChat')))


    // to select the friends suggestions
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot))
    ).pipe(
      skipWhile(val => val[1] !== 'cardChat'),
      map(x => x[0]),
      map(val => val.filter(x => x._id !== this.data.myProfileID)),
      map(val => val.filter(x => !(this.data.cardHeader.map(x => x._id)).includes(x._id))),
      map(val => val.filter(x => !(this.participantAdded.map(x => x._id)).includes(x._id))),
      skipWhile(val => val.length == 0)
    )

  }

  ngAfterViewInit() {
    // to scroll to the bottom of the chat room
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    // to scroll to the bottom of the chat room
    try {
      if(this.counterPage == 1){
        this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }


  send(roomID: string) {

    // to construct the message 
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
        this.store$.dispatch(new RoomByIdStoreActions.sendMessage(message, roomID))
        this.text = null
        return null
    }

  }

  create(message: any) {

    // to create a new room 
    this.room$.pipe(take(1)).subscribe(val => {
      const room = new Room(val.participants.map(x => x._id), message)
      this.store$.dispatch(new RoomByIdStoreActions.createRoom(room))
    })

    // reset the text
    this.text = null

  }

  createWithSearch(message: any){

    // to create a group with the search
    const room = new Room(this.data.cardHeader.map(x => x._id), message)
    this.store$.dispatch(new RoomByIdStoreActions.createRoom(room))

    // reset the text
    this.text = null

  }

  close() {
    // to close the modal
    this.dialogRef.close()
  }

  changeMode(modifMode: string) {
    // to change the displaying mode
    this.mode = modifMode
  }

  deleteRoom(roomID: string) {
    // to delete a room
    this.store$.dispatch(new CurrentRoomStoreActions.DeleteRoom(roomID))
    this.store$.dispatch(new RoomByIdStoreActions.deleteRoom(roomID))
    this.close()
  }

  blockUser(){
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }

  muteRoom(roomID: string) {
    // to mute a group
    // this.store$.dispatch(new RoomByIdStoreActions.currentRoomMute(roomID, 1))
    // this.changeMode('default')
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }

  unMuteRoom(room: Observable<Room>) {
    // to unmute a group
    room.subscribe(data => {
      this.store$.dispatch(new RoomByIdStoreActions.currentRoomMute(data._id, 0))
    })
  }

  updateState(roomID: string) {
    // to change the state for the notification
    this.stateP.changeState({ mini_roomActif: roomID });
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    if (this.roomSubscription) this.roomSubscription.unsubscribe()
    if (this.infoRoomSubscription) this.infoRoomSubscription.unsubscribe()
  }

  onScrollUp() {
    // to get more message
    this.counterPage += 1
    this.room$.pipe(take(1)).subscribe(action => {
      if( action.nbMessage === action.message.length ) return null
      this.store$.dispatch(new RoomByIdStoreActions.moreMessage(action._id, this.counterPage, action.nbMessage))
    })
  }

  getAvatarChat(participants: ProfileModel[], ownerID: string): string {
    // to get the avatar for the header
    return participants[participants.map(x => x._id).indexOf(ownerID)].pictureprofile
  }

  addParticipant(profile: ProfileModel) {
    // to add someone in the room
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)
    this.participantAdded.push(profile)
    this.searchField.setValue('')
  }

  deleteParticipant(profileID: string) {
    // to pull someone
    this.participantAdded.splice(this.participantAdded.map(x => x._id).indexOf(profileID), 1)
  }

  activeSearch() {
    // to show the search bar
    // this.addingContainer = true // pending now
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }

  cancelSearch() {
    // to clean the search after click on an user
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)
    this.addingContainer = false
    this.searchField.setValue('')
  }

  checkGroup() {

    // to see if the group already exist
    this.room$.pipe(take(1)).subscribe(val => {
      this.store$.dispatch(new RoomByIdStoreActions.loadRoomByIdProfiles(
        [...this.participantAdded.map(x => x._id), ...val.participants.map(x => x._id)]
      ))
    })

    // to reset the search
    this.cancelSearch()

  }

  createNewRoom() {
    // to create a new room
    const newRoom = new Room(this.participantAdded, null)
    this.store$.dispatch(new RoomByIdStoreActions.createGroupRoomDesign(newRoom))
  }

}

interface DataMiniChat {
  cardHeader: ProfileModel[]
  currentRoom: Room
  myProfileID: string
  searching: boolean
}