import { AdminsFeatureStoreModule } from './admins-feature-store/admins-feature-store.module'
import { PageFeatureStoreModule } from './page-feature-store/page-feature-store.module'
import { environment } from './../../environments/environment'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FriendsFeatureStoreModule } from './friends-feature-store/friends-feature-store.module'
import { FriendsRequestFeatureStoreModule } from './friends-request-feature-store/friends-request-feature-store.module'
import { ProfileFeatureStoreModule } from './profile-feature-store/profile-feature-store.module'
import { CommentFeatureStoreModule } from './comment/comment-store/comment-store.module'
import { PushLikeFeatureStoreModule } from './push-like-feature-store/push-like-feature-store.module'
import { NotificationNumberStoreModule } from './notification-number-store'
import { NotificationsStoreModule } from './notification-store'
import { SearchProfileStoreModule } from './search-profile-store'
import { SearchPageStoreModule } from './search-page-store'
import { MyUserStoreModule } from './my-user-store'
import { UserStoreModule } from './user-store'
import { SearchPseudoStoreModule } from './search-pseudo-store'
import { PasswordStoreModule } from './password-store'
import { SettingStoreModule } from './setting-user-store/setting-store.module'
import { ResponseFeatureStoreModule } from './comment/response-store'
import { MusicProjectStoreModule } from './music-project-store'
import { PlayerMusicStoreModule } from './player-music-store'
import { MusicByIdStoreModule } from './musicById-store'
import { PlaylistMusicStoreModule } from './playlistMusic-store'
import { PlaylistMusicByIdStoreModule } from './playlistMusicById-store'
import { ReportStoreModule } from './report-store'
import { MyMusicLikedStoreModule } from './myMusicLiked-store'
import { CurrentRoomStoreModule } from './messenger/current-room-store'
import { RoomByIdStoreModule } from './messenger/room-by-id-store'
import { AllRoomsStoreModule } from './messenger/all-rooms-store'
import { FullRoomByIdStoreModule } from './messenger/full-room-by-id-store'
import { ViewStatStoreModule } from './view-stat-store'
import { GroupStoreModule } from './group-store/list-group'
import { OneGroupStoreModule } from './group-store/one-group/group-store.module'
import { ListPlaylistMusicStoreModule } from './list-playlistMusic-store/list-playlist-music-store.module'
import { ProfileListStoreModule } from './profileList-store'
import { TubeMenuStoreModule } from './tube-menu-store'
import { TubePageStoreModule } from './tube-page-store'
import { TubeFeedStoreModule } from './tube-feed-store'
import { FeedPublicationStoreModule } from './feed-publication-store'
import { FeedPublicationByIdStoreModule } from './feed-publication-by-id-store'

@NgModule({
  declarations: [],
  providers: [ ],
  imports: [
    CommonModule, FeedPublicationStoreModule, FeedPublicationByIdStoreModule, MusicProjectStoreModule, ReportStoreModule,
    CommentFeatureStoreModule, ResponseFeatureStoreModule, PushLikeFeatureStoreModule, FriendsFeatureStoreModule,
    FriendsRequestFeatureStoreModule, MyUserStoreModule, UserStoreModule, MusicByIdStoreModule, PlayerMusicStoreModule,
    PasswordStoreModule, PlaylistMusicStoreModule, PlaylistMusicByIdStoreModule, ProfileFeatureStoreModule,
    CurrentRoomStoreModule, RoomByIdStoreModule, FullRoomByIdStoreModule, AllRoomsStoreModule, TubeMenuStoreModule,
    PageFeatureStoreModule, SettingStoreModule, NotificationsStoreModule, NotificationNumberStoreModule, 
     MyMusicLikedStoreModule, SearchProfileStoreModule, ListPlaylistMusicStoreModule, TubePageStoreModule, 
    SearchPseudoStoreModule, SearchPageStoreModule, AdminsFeatureStoreModule, GroupStoreModule, OneGroupStoreModule,
    StoreModule.forRoot({}), EffectsModule.forRoot([]), ProfileListStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), ViewStatStoreModule,
    TubeFeedStoreModule
  ]
})
export class RootStoreModule { }
