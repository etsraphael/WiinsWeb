import { SignComponent } from './sign/sign.component';
import { MypageComponent } from './mypage/mypage.component';
import { PlaylistComponent } from './space-music/playlist/playlist.component';
import { PageStoryComponent } from './page/page-story/page-story.component';
import { PageComponent } from './page/page.component';
import { ChoiceComponent } from './space-creative/choice/choice.component';
import { CreateMusicProjectComponent } from './space-creative/create-music-project/create-music-project.component';
import { CreateGroupComponent } from './space-creative/create-group/create-group.component';
import { MusicMainComponent } from './space-music/music-main/music-main.component';
import { SpaceMusicComponent } from './space-music/space-music.component';
import { ProfileTubeComponent } from './profile/profile-tube/profile-tube.component';
import { NotificationComponent } from './home-setting/notification/notification.component';
import { UpdatePasswordComponent } from './home-setting/update-password/update-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './sign/login/login.component';
import { RegisterComponent } from './sign/register/register.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { UpdateUsersComponent } from './home-setting/update-users/update-users.component';
import { HomeSettingComponent } from './home-setting/home-setting.component';
import { VisibilityComponent } from './home-setting/visibility/visibility.component';
import { OthersComponent } from './home-setting/others/others.component';
import { SpaceStoryComponent } from './space-story/space-story.component';
import { ProfileComponent } from './profile/profile.component';
import { SpaceMessengerComponent } from './space-messenger/space-messenger.component';
import { ProfileStoryComponent } from './profile/profile-story/profile-story.component';
import { ProfileMusicComponent } from './profile/profile-music/profile-music.component';
import { MusicSaveComponent } from './space-music/music-save/music-save.component';
import { SpaceTubeComponent } from './space-tube/space-tube.component';
import { SpaceGroupComponent } from './space-group/space-group.component';
import { ProfileResolver } from './core/services/core/profile.resolver';
import { UserResolver } from './core/services/core/user.resolver';
import { SpaceCreativeComponent } from './space-creative/space-creative.component';
import { CreateEventComponent } from './space-creative/create-event/create-event.component';
import { CreatePageComponent } from './space-creative/create-page/create-page.component';
import { CreateTubePublicationComponent } from './space-creative/create-tube-publication/create-tube-publication.component';
import { NoprofileComponent } from './notfound/noprofile/noprofile.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterConfirmationComponent } from './sign/register-confirmation/register-confirmation.component';
import { DefaultPageComponent } from './mypage/default-page/default-page.component';
import { TeamPageComponent } from './mypage/team-page/team-page.component';
import { PageResolver } from './core/services/page/page.resolver';
import { UploadAlbumComponent } from './space-creative/create-music-project/upload-album/upload-album.component';
import { UploadMusicComponent } from './space-creative/create-music-project/upload-music/upload-music.component';
import { CreatePlaylistMusicComponent } from './space-creative/create-playlist-music/create-playlist-music.component';
import { SettingPageComponent } from './mypage/setting-page/setting-page.component';
import { TermOfUseComponent } from './term-of-use/term-of-use.component';
import { SpaceDiscoverComponent } from './space-discover/space-discover.component';
import { WatchingVideoComponent } from './space-tube/watching-video/watching-video.component';
import { HomeTubeComponent } from './space-tube/home-tube/home-tube.component';
import { GroupStoryComponent } from './space-group/group-story/group-story.component';
import { GroupManagementComponent } from './space-group/group-management/group-management.component';
import { LanguageComponent } from './home-setting/language/language.component';
import { ListPlaylistMusicComponent } from './space-music/list-playlist-music/list-playlist-music.component';
import { ForgotPasswordComponent } from './sign/forgot-password/forgot-password.component';
import { ChangingPasswordComponent } from './sign/changing-password/changing-password.component';
import { CommunityListComponent } from './core/component/community-list/community-list.component';
import { CertificationMenuComponent } from './home-setting/certification-menu/certification-menu.component';
import { LedgerComponent } from './home-setting/ledger/ledger.component';
import { OnboardingComponent } from './sign/onboarding/onboarding.component';
import { ToDiscordComponent } from './sign/to-discord/to-discord.component';
import { ToStripeComponent } from './sign/to-stripe/to-stripe.component';
import { ForgotPasswordConfirmationComponent } from './sign/forgot-password-confirmation/forgot-password-confirmation.component';

const routes: Routes = [

  // Connexion
  {
    path: 'sign', component: SignComponent,
    data: { animation: 'Sign' },
    children: [
      { path: '', component: OnboardingComponent, data: { title: 'Login', animation: 'OnBoarding' } },
      { path: 'in', component: LoginComponent, data: { title: 'Login', animation: 'SignIn' } },
      { path: 'up', component: RegisterComponent, data: { title: 'Register', animation: 'SignUp' } },
      { path: 'confirmation/:id', component: RegisterConfirmationComponent, data: { title: 'Confirmation' } },
      { path: 'password-confirmation-sended', component: ForgotPasswordConfirmationComponent, data: { animation: 'Password-Confirmation-Sended' } },
      { path: 'password-setting', component: ForgotPasswordComponent, data: { animation: 'Password-Setting' } },
      { path: 'to-discord', component: ToDiscordComponent, data: { animation: 'To-Discord' } },
      { path: 'to-stripe', component: ToStripeComponent, data: { animation: 'To-Stripe' } },
      { path: 'changing-password/:token', component: ChangingPasswordComponent },
    ],
  },

  // annexes
  {
    path: 'term-of-use', component: TermOfUseComponent,
  },

  // Home
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home', animation: 'Home' },
    canActivate: [AuthGuard],
    resolve: {
      loadedUser: UserResolver,
      loadedProfile: ProfileResolver
    },
    children: [
      { path: '', redirectTo: 'SpaceStory', pathMatch: 'full' },
      { path: 'Messenger', component: SpaceMessengerComponent, data: { animation: 'Messenger' } },
      { path: 'SpaceStory', component: SpaceStoryComponent, data: { animation: 'Story' } },

      // Space for discover
      { path: 'SpaceDiscover/#', component: SpaceDiscoverComponent, data: { animation: 'Discover' } },
      { path: 'SpaceDiscover/:name', component: SpaceDiscoverComponent, data: { animation: 'Discover' } },

      // Space for music
      {
        path: 'SpaceMusic',
        component: SpaceMusicComponent,
        data: { animation: 'Music' },
        children: [
          { path: '', redirectTo: 'trend', pathMatch: 'full' },
          { path: 'trend', component: MusicMainComponent },
          { path: 'save', component: MusicSaveComponent },
          { path: 'playlist/:id', component: PlaylistComponent },
          { path: 'list/playlist/:name', component: ListPlaylistMusicComponent }
        ]
      },

      // Profil of Someone
      {
        path: 'profile/:id', component: ProfileComponent,
        data: { animation: 'Profile' },
        children: [
          { path: '', redirectTo: 'Story', pathMatch: 'full' },
          { path: 'Story', component: ProfileStoryComponent, data: { animation: 'Story' } },
          { path: 'Music', component: ProfileMusicComponent, data: { animation: 'Music' } },
          { path: 'Tube', component: ProfileTubeComponent, data: { animation: 'Tube' } },
          { path: 'Community', component: CommunityListComponent }
        ]
      },

      // Space for creation
      {
        path: 'SpaceCreative', component: SpaceCreativeComponent,

        children: [
          { path: '', redirectTo: 'choice', pathMatch: 'full' },
          { path: 'choice', component: ChoiceComponent },
          { path: 'event', component: CreateEventComponent },
          { path: 'group', component: CreateGroupComponent },
          { path: 'page', component: CreatePageComponent },
          { path: 'tube', component: CreateTubePublicationComponent },
          {
            path: 'musicProject', component: CreateMusicProjectComponent,
            children: [
              { path: '', redirectTo: 'album', pathMatch: 'full' },
              { path: 'album', component: UploadAlbumComponent },
              { path: 'music', component: UploadMusicComponent },
            ]
          },
          { path: 'playlistMusic', component: CreatePlaylistMusicComponent },
        ]
      },

      // Space for Tube
      {
        path: 'SpaceTube', component: SpaceTubeComponent,
        data: { animation: 'Tube' },
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeTubeComponent, data: { animation: 'Home' } },
          { path: 'watching-video/:id', component: WatchingVideoComponent, data: { animation: 'Watching' } },
        ]
      },

      // Page
      {
        path: 'page/:id',
        component: PageComponent,
        data: { animation: 'Page', adminRequired: false },
        children: [
          { path: '', redirectTo: 'story', pathMatch: 'full' },
          { path: 'story', component: PageStoryComponent }
        ]
      },

      // MyPage
      {
        path: 'mypage/:id',
        component: MypageComponent,
        data: { animation: 'MyPage', adminRequired: true },
        resolve: { loadedPage: PageResolver },
        children: [
          { path: '', redirectTo: 'story', pathMatch: 'full' },
          { path: 'story', component: DefaultPageComponent },
          { path: 'team', component: TeamPageComponent },
          { path: 'setting', component: SettingPageComponent }
        ]
      },

      // Not found
      {
        path: 'notFound',
        component: NotfoundComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: NoprofileComponent },
        ]
      },

      // group
      {
        path: 'SpaceGroup',
        component: SpaceGroupComponent,
        data: { animation: 'Group' },
        children: [
          { path: '', redirectTo: 'group-story', pathMatch: 'full' },
          { path: 'group-story', component: GroupStoryComponent },
          { path: 'setting/:id', component: GroupManagementComponent },
        ]
      },

    ]
  },

  // Home Setting
  {
    path: 'setting',
    component: HomeSettingComponent,
    data: { title: 'Setting' },
    canActivate: [AuthGuard],
    resolve: {
      loadedUser: UserResolver,
      loadedProfile: ProfileResolver
    },
    children: [
      { path: '', redirectTo: 'update-users', pathMatch: 'full' },
      { path: 'update-users', component: UpdateUsersComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'language', component: LanguageComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'others', component: OthersComponent },
      { path: 'visibility', component: VisibilityComponent },
      { path: 'ledger', component: LedgerComponent },
      { path: 'certificate', component: CertificationMenuComponent }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
