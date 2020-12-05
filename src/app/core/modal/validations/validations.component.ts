import { Component, Inject, EventEmitter } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { RootStoreState, CommentFeatureStoreActions, GroupFeatureStoreActions, FeedPublicationStoreActions, ProfileFeatureStoreActions, TubeFeedStoreActions, TubePageStoreActions } from 'src/app/root-store'
import { PicturePublication, PostPublication, VideoPublication } from '../../models/publication/feed/feed-publication.model'
import { TubeModel } from '../../models/tube/tube.model'

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss'],
})

export class ValidationsComponent {

  // parent
  onAction = new EventEmitter();

  constructor(
    private store$: Store<RootStoreState.State>,
    public dialogRef: MatDialogRef<ValidationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ValidationData
  ) { }

  confirm() {

    // to send the action
    switch (this.data.type) {
      case 'feed-publication-group-delete':
      case 'feed-publication-delete':
      case 'feed-my-profile-feed-publication-delete':
      case 'feed-publication-delete': {
        this.store$.dispatch(new FeedPublicationStoreActions.RemoveFeedPublication(this.data.id))
        break
      }
      case 'delete-comment': {
        this.store$.dispatch(new CommentFeatureStoreActions.DeleteComment(this.data.id, this.data.publication._id))
        this.onAction.emit('deleted')
        break
      }
      case 'delete-friend': {
        this.store$.dispatch(new ProfileFeatureStoreActions.DeleteFriend(this.data.id))
        break
      }
      case 'leave-group':
        this.store$.dispatch(new GroupFeatureStoreActions.LeaveGroup(this.data.id));
        break
      case 'delete-tube': {
        this.store$.dispatch(new TubeFeedStoreActions.DeleteTubeFeed(this.data.id));
        break
      }
      case 'delete-comment-playlist-music': {
        this.store$.dispatch(new CommentFeatureStoreActions.DeleteCommentPlaylistMusic(this.data.commentId, this.data.playlistId))
        break
      }
      case 'unfollow-from-tube': {
        this.store$.dispatch(new TubePageStoreActions.UnFollowProfile(this.data.id))
        break
      }
      case 'delete-friend-from-tube': {
        this.store$.dispatch(new TubePageStoreActions.DeleteFriend(this.data.id))
        break
      }
      default: break
    }

    this.closeModal()

  }

  closeModal() {
    // to close the modal
    this.dialogRef.close()
  }

}


interface ValidationData {
  publication: PicturePublication | PostPublication | VideoPublication | TubeModel | any,
  type: string
  id: string
  commentId: string
  playlistId: string
}
