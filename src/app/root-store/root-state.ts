import { ProfileFeatureStoreState } from './profile-feature-store'
import { FriendsFeatureStoreState } from './friends-feature-store'
import { FriendsRequestFeatureStoreState } from './friends-request-feature-store'
import { CommentFeatureStoreState } from './comment/comment-store'
import { PushLikeFeatureStoreState } from './push-like-feature-store'
import { PageFeatureStoreState } from './page-feature-store'
import { AdminsFeatureStoreState } from './admins-feature-store'
import { NotificationNumberStoreState } from './notification-number-store'
import { NotificationsStoreState } from './notification-store'
import { FeedPublicationByIdStoreState } from './feed-publication-by-id-store'
import { SearchProfileStoreState } from './search-profile-store'
import { SearchPageStoreState } from './search-page-store'
import { MyUserStoreState } from './my-user-store'
import { UserStoreState } from './user-store'
import { SearchPseudoStoreState } from './search-pseudo-store'
import { PasswordStoreState } from './password-store'
import { SettingStoreState } from './setting-user-store'
import { ResponseFeatureStoreState } from './comment/response-store'
import { MusicProjectStoreState } from './music-project-store'
import { PlayerMusicStoreState } from './player-music-store'
import { MusicByIdStoreState } from './musicById-store'
import { PlaylistMusicStoreState } from './playlistMusic-store'
import { PlaylistMusicByIdStoreState } from './playlistMusicById-store '
import { ReportStoreState } from './report-store'
import { MyMusicLikedStoreState } from './myMusicLiked-store'
import { CurrentRoomStoreState } from './messenger/current-room-store'
import { RoomByIdStoreState } from './messenger/room-by-id-store'
import { AllRoomsStoreState } from './messenger/all-rooms-store'
import { FullRoomByIdStoreState } from './messenger/full-room-by-id-store'
import { ViewStatStoreState } from './view-stat-store'
import { GroupFeatureStoreState } from './group-store/list-group'
import { OneGroupFeatureStoreState } from './group-store/one-group'
import { PlaylistsMusicStoreState } from './list-playlistMusic-store'
import { ProfileListStoreState } from './profileList-store'
import { TubeMenuStoreState } from './tube-menu-store'
import { TubePageStoreState } from './tube-page-store'
import { TubeFeedStoreState } from './tube-feed-store'
import { FeedPublicationStoreState } from './feed-publication-store'

export interface State {
  feedPublication: FeedPublicationStoreState.State
  feedPublicationById: FeedPublicationByIdStoreState.State
  musicProject: MusicProjectStoreState.State
  profileList: ProfileListStoreState.State
  tubeFeed: TubeFeedStoreState.State
  tubeMenu: TubeMenuStoreState.State
  tubePage: TubePageStoreState.State
  mymusic: MyMusicLikedStoreState.State
  commentFeature: CommentFeatureStoreState.State
  responseFeature: ResponseFeatureStoreState.State
  pushLikeFeature: PushLikeFeatureStoreState.State
  MyuserFeature: MyUserStoreState.State
  user: UserStoreState.State
  viewStat: ViewStatStoreState.State
  report: ReportStoreState.State
  currentRoom: CurrentRoomStoreState.State
  allRooms: AllRoomsStoreState.State
  roomById: RoomByIdStoreState.State
  groups: GroupFeatureStoreState.State
  oneGroup: OneGroupFeatureStoreState.State
  fullroomById: FullRoomByIdStoreState.State
  playlistMusic: PlaylistMusicStoreState.State
  listplaylistMusic: PlaylistsMusicStoreState.State
  playlistMusicById: PlaylistMusicByIdStoreState.State
  musicById: MusicByIdStoreState.State
  playerMusic: PlayerMusicStoreState.State
  userSetting: SettingStoreState.State
  password: PasswordStoreState.State
  profileFeature: ProfileFeatureStoreState.StateProfile
  profilePageFeature: ProfileFeatureStoreState.StateProfilePage
  friendsFeature: FriendsFeatureStoreState.State
  friendsRequestFeature: FriendsRequestFeatureStoreState.State
  searchProfileFeature: SearchProfileStoreState.State
  searchPseudoFeature: SearchPseudoStoreState.State
  searchPageFeature: SearchPageStoreState.State
  pageFeature: PageFeatureStoreState.State
  adminsFeature: AdminsFeatureStoreState.State
  notification: NotificationsStoreState.State
  notificationNumberRequest: NotificationNumberStoreState.StateNumberRequest
  notificationNumberActivity: NotificationNumberStoreState.StateNumberActivity
}
