import { ContentIdComponent } from 'src/app/core/modal/content-id/content-id.component'
import { RootStoreModule } from './root-store'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientJsonpModule, HttpClientModule, HttpClient } from '@angular/common/http'
import { DatePipe } from '@angular/common'
import {
  MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule,
  MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatDatepickerModule,
  MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatAutocompleteModule, MatStepperModule, MatProgressBarModule,
  MatExpansionModule
} from '@angular/material'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AppRoutingModule } from './app-routing.module'
import { MaterialModule } from '../material'
import { CoreModule } from './core/core.module'
import { MatNativeDateModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { ClickOutsideModule } from 'ng-click-outside'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { AgmCoreModule } from '@agm/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent } from './app.component'
import { LoginComponent } from './sign/login/login.component'
import { RegisterComponent } from './sign/register/register.component'
import { HomeComponent } from './home/home.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { MyProfileComponent } from './myprofile/myprofile.component'
import { UpdateUsersComponent } from './home-setting/update-users/update-users.component'
import { HomeSettingComponent } from './home-setting/home-setting.component'
import { UpdatePasswordComponent } from './home-setting/update-password/update-password.component'
import { ProfilePictureComponent } from './home-setting/update-users/profile-picture/profile-picture.component'
import { ProfileCoverComponent } from './home-setting/update-users/profile-cover/profile-cover.component'
import { SidebarSettingComponent } from './home-setting/sidebar-setting/sidebar-setting.component'
import { VisibilityComponent } from './home-setting/visibility/visibility.component'
import { IdentificationComponent } from './home-setting/visibility/identification/identification.component'
import { BlacklistComponent } from './home-setting/visibility/blacklist/blacklist.component'
import { VisibilityMainComponent } from './home-setting/visibility/visibility-main/visibility-main.component'
import { NotificationComponent } from './home-setting/notification/notification.component'
import { OthersComponent } from './home-setting/others/others.component'
import { MiniChatComponent } from './space-messenger/mini-chat/mini-chat.component'
import { MiniPlayerMusicComponent } from './space-music/mini-player-music/mini-player-music.component'
import { SpaceStoryComponent } from './space-story/space-story.component'
import { ProfileComponent } from './profile/profile.component'
import { SpaceMessengerComponent } from './space-messenger/space-messenger.component'
import { ThreadMessageComponent } from './space-messenger/thread-message/thread-message.component'
import { ProfileStoryComponent } from './profile/profile-story/profile-story.component'
import { ProfileMusicComponent } from './profile/profile-music/profile-music.component'
import { ProfileTubeComponent } from './profile/profile-tube/profile-tube.component'
import { SpaceMusicComponent } from './space-music/space-music.component'
import { MusicMainComponent } from './space-music/music-main/music-main.component'
import { MusicSaveComponent } from './space-music/music-save/music-save.component'
import { SpaceTubeComponent } from './space-tube/space-tube.component'
import { SpaceGroupComponent } from './space-group/space-group.component'
import { ListGroupComponent } from './space-group/list-group/list-group.component'
import { SpaceCreativeComponent } from './space-creative/space-creative.component'
import { CreateEventComponent } from './space-creative/create-event/create-event.component'
import { CreateGroupComponent } from './space-creative/create-group/create-group.component'
import { CreatePageComponent } from './space-creative/create-page/create-page.component'
import { CreateTubePublicationComponent } from './space-creative/create-tube-publication/create-tube-publication.component'
import { CreateMusicProjectComponent } from './space-creative/create-music-project/create-music-project.component'
import { FirstTutoMessageComponent } from './space-creative/first-tuto-message/first-tuto-message.component'
import { MessageMonetizationComponent } from './space-creative/message-monetization/message-monetization.component'
import { NotfoundComponent } from './notfound/notfound.component'
import { NoprofileComponent } from './notfound/noprofile/noprofile.component'
import { SiPipeModule } from 'ng-si'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { RegisterConfirmationComponent } from './sign/register-confirmation/register-confirmation.component'
import { NgxMasonryModule } from 'ngx-masonry'
import { ChoiceComponent } from './space-creative/choice/choice.component'
import { PageComponent } from './page/page.component'
import { PageStoryComponent } from './page/page-story/page-story.component'
import { PlaylistComponent } from './space-music/playlist/playlist.component'
import { MypageComponent } from './mypage/mypage.component'
import { DefaultPageComponent } from './mypage/default-page/default-page.component'
import { AccountHeaderComponent } from './mypage/default-page/account-header/account-header.component'
import { TeamPageComponent } from './mypage/team-page/team-page.component'
import { CardFeedPagePublicationComponent } from './mypage/card-feed-page-publication/card-feed-page-publication.component'
import { RequestListComponent } from './nav-bar/request-list/request-list.component'
import { NotificationListComponent } from './nav-bar/notification-list/notification-list.component'
import { SearchListComponent } from './nav-bar/search-list/search-list.component'
import { ViewProfileComponent } from './space-music/playlist/view-profile/view-profile.component'
import { ViewPlayerComponent } from './space-music/playlist/view-player/view-player.component'
import { MusicListComponent } from './space-music/playlist/music-list/music-list.component'
import { ViewCommentComponent } from './space-music/playlist/view-comment/view-comment.component'
import { SignComponent } from './sign/sign.component'
import { UploadMusicComponent } from './space-creative/create-music-project/upload-music/upload-music.component'
import { UploadAlbumComponent } from './space-creative/create-music-project/upload-album/upload-album.component'
import { MyProfileMusicComponent } from './myprofile/my-profile-music/my-profile-music.component'
import { MyProfileStoryComponent } from './myprofile/my-profile-story/my-profile-story.component'
import { MyProfileTubeComponent } from './myprofile/my-profile-tube/my-profile-tube.component'
import { CreatePlaylistMusicComponent } from './space-creative/create-playlist-music/create-playlist-music.component'
import { SettingPageComponent } from './mypage/setting-page/setting-page.component'
import { ValidationsComponent } from './core/modal/validations/validations.component'
import { PrivateAccountComponent } from './core/not-show/private-account/private-account.component'
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { PasswordValidationsComponent } from './core/modal/password-validations/password-validations.component'
import { UserListMessageComponent } from './space-messenger/user-list-message/user-list-message.component';
import { CardChatComponent } from './space-messenger/card-chat/card-chat.component';
import { TermOfUseComponent } from './term-of-use/term-of-use.component'
import { GeocodeService } from './core/services/geo/geocode.service'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SpaceDiscoverComponent } from './space-discover/space-discover.component'
import { AutosizeModule } from 'ngx-autosize';
import { WatchingVideoComponent } from './space-tube/watching-video/watching-video.component';
import { HomeTubeComponent } from './space-tube/home-tube/home-tube.component';
import { ManagementTeamComponent } from './core/modal/management-team/management-team.component'
import { ProfileListComponent } from './core/modal/profile-list/profile-list.component';
import { GroupManagementComponent } from './space-group/group-management/group-management.component';
import { GroupStoryComponent } from './space-group/group-story/group-story.component';
import { CardFeedGroupPublicationComponent } from './space-group/card-feed-group-publication/card-feed-group-publication.component'
import { GroupValidationComponent } from './core/modal/group-validation/group-validation.component'
import { FeedPublicationStandardComponent } from './core/component/feed-publication-standard/feed-publication-standard.component'
import { FeedPublicationComponent } from './core/component/feed-publication/feed-publication.component'
import { PublicationModalComponent } from './core/modal/publication-modal/publication-modal.component'
import { PublicationMiniatureComponent } from './core/component/publication-miniature/publication-miniature.component'
import { CrooperImageValidationComponent } from './core/modal/crooper-image-validation/crooper-image-validation.component'
import { ImageCropperModule } from 'ngx-image-cropper'
import { LanguageComponent } from './home-setting/language/language.component';
import { ContainerTOUComponent } from './term-of-use/container-t-o-u/container-t-o-u.component'
import { ModalTOUComponent } from './core/modal/modal-t-o-u/modal-t-o-u.component';
import { ListPlaylistMusicComponent } from './space-music/list-playlist-music/list-playlist-music.component'
import { NgxImageCompressService } from 'ngx-image-compress'
import { QRCodeModule } from 'angularx-qrcode';
import { ForgotPasswordComponent } from './sign/forgot-password/forgot-password.component';
import { ChangingPasswordComponent } from './sign/changing-password/changing-password.component';
import { FeedPageAdminStandardComponent } from './mypage/feed-page-admin-standard/feed-page-admin-standard.component';
import { Ng5SliderModule } from 'ng5-slider';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CommunityListComponent } from './core/component/community-list/community-list.component'
import { ReportModalComponent } from './core/modal/report-modal/report-modal.component'
import { ReportMessageComponent } from './core/modal/report-message/report-message.component';
import { PremiumSettingComponent } from './home-setting/premium-setting/premium-setting.component'
import { FooterCoreComponent } from './core/component/footer-core/footer-core.component';
import { VerificationSpaceUnlockedComponent } from './space-creative/verification-space-unlocked/verification-space-unlocked.component';
import { CertificationMenuComponent } from './home-setting/certification-menu/certification-menu.component'

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient)
}

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, HomeComponent, NavBarComponent,
    MyProfileComponent, UpdateUsersComponent, HomeSettingComponent, UpdatePasswordComponent, ProfilePictureComponent,
    ProfileCoverComponent, FeedPublicationStandardComponent, SidebarSettingComponent, FeedPublicationComponent, VisibilityComponent,
    VisibilityMainComponent, IdentificationComponent, BlacklistComponent, LanguageComponent, NotificationComponent,
    OthersComponent, MiniChatComponent, MiniPlayerMusicComponent, SpaceStoryComponent,
    ProfileComponent, SpaceMessengerComponent, ThreadMessageComponent, UserListMessageComponent, ProfileStoryComponent,
    ProfileMusicComponent, ProfileTubeComponent, SpaceMusicComponent, MusicMainComponent, MusicSaveComponent,
    SpaceTubeComponent, SpaceGroupComponent, PrivateAccountComponent, ListGroupComponent,
    SpaceCreativeComponent, CreateEventComponent, CreateGroupComponent, CreatePageComponent, CreateTubePublicationComponent,
    CreateMusicProjectComponent, FirstTutoMessageComponent, MessageMonetizationComponent, NotfoundComponent,
    NoprofileComponent, RegisterConfirmationComponent, PublicationModalComponent, ChoiceComponent, PageComponent,
    PageStoryComponent, PlaylistComponent, MypageComponent, DefaultPageComponent, FeedPageAdminStandardComponent,
    AccountHeaderComponent, TeamPageComponent, CardFeedPagePublicationComponent, PublicationMiniatureComponent, RequestListComponent,
    NotificationListComponent, SearchListComponent, ViewProfileComponent, ViewPlayerComponent, MusicListComponent,
    ViewCommentComponent, SignComponent, UploadMusicComponent, UploadAlbumComponent, MyProfileMusicComponent,
    MyProfileStoryComponent, MyProfileTubeComponent, CreatePlaylistMusicComponent, SettingPageComponent,
    ContainerTOUComponent, ListPlaylistMusicComponent, WatchingVideoComponent, HomeTubeComponent,
    CardChatComponent, TermOfUseComponent, ProfileListComponent, SpaceDiscoverComponent, GroupManagementComponent,
    GroupStoryComponent, CardFeedGroupPublicationComponent, CrooperImageValidationComponent, ValidationsComponent,
    ContentIdComponent, PasswordValidationsComponent, ModalTOUComponent, ChangingPasswordComponent,
    ManagementTeamComponent, GroupValidationComponent, ReportMessageComponent, FooterCoreComponent,
    ForgotPasswordComponent, CommunityListComponent, ReportModalComponent, PremiumSettingComponent, VerificationSpaceUnlockedComponent, CertificationMenuComponent
  ],
  imports: [
    RootStoreModule, BrowserModule, NgxMasonryModule, AppRoutingModule, NgbModule, HttpClientModule,
    HttpClientJsonpModule, CoreModule, MatNativeDateModule, BrowserAnimationsModule, FormsModule, AutosizeModule,
    MaterialModule, ReactiveFormsModule, MatToolbarModule, SiPipeModule, MatFormFieldModule, ClickOutsideModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
    MatDividerModule, MatSnackBarModule, MatStepperModule, MatDatepickerModule, MatButtonToggleModule, MatDialogModule,
    MatSlideToggleModule, MatProgressBarModule, MatBadgeModule, MatAutocompleteModule, GooglePlaceModule,
    InfiniteScrollModule, RoundProgressModule, DragDropModule, ImageCropperModule, QRCodeModule, Ng5SliderModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] } }),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBeGo5RVBH2HjPk0C4lXkQv2hhMKEpCz60' }),
    MatExpansionModule, DeviceDetectorModule.forRoot()
  ],
  providers: [DatePipe, GeocodeService, NgxImageCompressService],
  bootstrap: [AppComponent],
  entryComponents: [
    PublicationModalComponent, ContentIdComponent, ValidationsComponent, PasswordValidationsComponent, CardChatComponent,
    GroupValidationComponent, CrooperImageValidationComponent, ReportModalComponent,
    ManagementTeamComponent, ProfileListComponent, ModalTOUComponent, ReportMessageComponent
  ]
})

export class AppModule { }
