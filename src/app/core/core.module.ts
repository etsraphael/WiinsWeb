import { LikeService } from './services/publications/like/like.service'
import { FriendRequestService } from './services/friend/friend-request.service'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthGuard } from './auth/auth.guard'
import { AuthenticationService } from './services/authentication/authentication.service'
import { CoreService } from './services/core/core.service'
import { SearchService } from './services/search/search.service'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { ProfileResolver } from './services/core/profile.resolver'
import { UserResolver } from './services/core/user.resolver'
import { CommentService } from './services/publications/comment/comment.service'
import { PageResolver } from './services/page/page.resolver'
import { PageService } from './services/page/page.service'
import { FriendService } from './services/friend/friend.service'
import { NotificationService } from './services/notification/notification.service'
import { FileUploadService } from './services/fileUpload/file-upload.service'
import { PlaylistMusicService } from './services/playlistMusic/playlist-music.service'
import { ReactiveFormsModule } from '@angular/forms'
import { MessengerService } from './services/messenger/messenger.service'
import { WsService } from './services/ws/ws.service'
import { UploadService } from './services/upload/upload.service'
import { UploadWithoutInjectorService } from './services/upload/upload-without-injector.service'
import { FeedService } from './services/publications/feed/feed.service'
import { MusicService } from './services/publications/music/music.service'

@NgModule({
  imports: [ CommonModule,  HttpClientModule, ReactiveFormsModule ],
  providers: [
    AuthGuard, AuthenticationService, CoreService, FeedService,
    CommentService, LikeService, PageService, FriendService, PlaylistMusicService,
    NotificationService, SearchService, WsService, MusicService, FriendRequestService,
    FileUploadService, ProfileResolver, UserResolver, MessengerService,
    PageResolver, UploadService, UploadWithoutInjectorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class CoreModule { }
