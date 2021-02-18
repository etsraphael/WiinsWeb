import { LikeNotif } from './../../core/models/notification/likeNotif.model'
import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import {
  RootStoreState, NotificationNumberStoreActions, NotificationNumberStoreSelectors,
  NotificationsStoreActions, NotificationsStoreSelectors, FeedPublicationByIdStoreActions,
  FeedPublicationByIdStoreSelectors
} from '../../root-store'
import { Store, select } from '@ngrx/store'
import { skipWhile, filter, take } from 'rxjs/operators'
import { CommentNotif } from 'src/app/core/models/notification/commentNotif.model'
import { RequestNotif } from 'src/app/core/models/notification/requestNotif.model'
import { BaseNotification } from 'src/app/core/models/notification/baseNotification.model'
import { Router } from '@angular/router'
import { LikeCommentNotif } from 'src/app/core/models/notification/likeCommentNotif.model'
import { ResponseNotifPlaylist } from 'src/app/core/models/notification/responseNotifPlaylist.model'
import { PublicationModalComponent } from 'src/app/core/modal/publication-modal/publication-modal.component'
import { MatDialog } from '@angular/material/dialog';

import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { TranslationService } from 'src/app/core/services/translation/translation.service'
import { ReportMessageComponent } from 'src/app/core/modal/report-message/report-message.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})

export class NotificationListComponent implements OnInit {

  // notification activity
  numberNewActivity$: Observable<number>;
  notifActivity$: Observable<CommentNotif[] | LikeNotif[] | RequestNotif[] | LikeCommentNotif[] | BaseNotification[]>
  isLoading$: Observable<Boolean>

  // modal
  publication$: Observable<FeedPublication>
  modalSub: Subscription

  constructor(
    private store$: Store<RootStoreState.State>,
    private router: Router,
    public dialog: MatDialog,
    public translateService: TranslationService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // to select the number of the notification
    this.numberNewActivity$ = this.store$.pipe(
      select(NotificationNumberStoreSelectors.selectNumberActivity),
      skipWhile(val => val === null)
    )

    // to select the publications after a click
    this.publication$ = this.store$.pipe(
      select(FeedPublicationByIdStoreSelectors.select),
      skipWhile(val => val === null),
      filter(val => !!val)
    )

  }

  showNotifActivity() {

    // reset the number of notification if it's superior to 0
    this.numberNewActivity$.pipe(take(1)).subscribe((number: Number) => {
      if (number > 0) this.store$.dispatch(new NotificationNumberStoreActions.InitilizeNumberActivity())
    })

    // to get the notification list
    this.loadActivityNotification()
    
  }

  loadActivityNotification() {

    // get the notifications
    this.notifActivity$ = this.store$.pipe(
      select(NotificationsStoreSelectors.selectAllNotificationFeatureItems),
      filter(val => !!val),
      skipWhile(val => val === null)
    )

    // get the loading progession
    this.isLoading$ = this.store$.pipe(
      select(NotificationsStoreSelectors.selectIsLoading),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )

  }

  goToNotif(n: CommentNotif | LikeNotif | RequestNotif | ResponseNotifPlaylist | any) {

    // actions for each type of publication

    try{
      switch (n.type) {
        case 'NotificationRequest':
          this.router.navigate([`/profile/${n.profile._id}`]);
          break;
        case 'NotificationLike':
        case 'NotificationResponse':
        case 'NotificationCommentLike':
        case 'NotificationComment':
        case 'NotificationTagCommentFeedPublication':
        case 'NotificationTagPublication':
          this.showModal(n.publication._id);
          break;
        case 'NotificationTagCommentPlaylist':
        case 'NotificationCommentResponsePlaylist':
        case 'NotificationCommentLikePlaylist':
          this.router.navigate([`/SpaceMusic/playlist/${n.playlist}`]);
          break;
        case 'NotificationFeatPublication':
          this.router.navigate([`/profile/${n.profile._id}/Music`]);
          break
        case 'NotificationReport':
          this.showModalReport(n)
          break;
        case 'NotificationVerification':
        case 'NotificationCertification' : 
          this.router.navigate([`/setting/certificate`]);
      }
    } catch(error) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.T-content-does-not-exist-anymore'),
        this.translate.instant('CORE.close'),
        { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      )
    }


    // if the message is not seen, we update the notification
    if (!n.read) this.seenNotif(n._id)

  }

  showModalReport(n: any): void {

    // to show the modal report
    this.dialog.open(ReportMessageComponent, {
      panelClass: ['col-md-8', 'col-xl-6'],
      data: { level: n.level, categorie: n.categorie }
    })

  }

  showModal(id: string): void {

    // to get a publication with the ID
    this.store$.dispatch(new FeedPublicationByIdStoreActions.LoadFeedPublicationById(id))

    // to show the publications in the modal
    this.modalSub = this.publication$.subscribe(publication => {

      const dialogRef = this.dialog.open(PublicationModalComponent, {
        panelClass: ['col-md-9', 'col-xl-8'],
        data: { publication, ownerId: publication.profile._id }
      })

      dialogRef.afterClosed().subscribe(() => this.modalSub.unsubscribe())

    })
  }

  seenNotif(id: string) {

    // to send the seen notification
    this.store$.dispatch(new NotificationsStoreActions.NotificationSeen(id))
    
  }

}
