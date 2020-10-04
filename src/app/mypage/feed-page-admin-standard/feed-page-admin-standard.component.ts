import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, PushLikeFeatureStoreActions, FeedPublicationStoreActions, ProfileFeatureStoreSelectors, SearchProfileStoreSelectors, CommentFeatureStoreActions, SearchProfileStoreActions } from 'src/app/root-store'
import { MatDialog } from '@angular/material'
import { PicturePublication, PostPublication, VideoPublication, FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { TranslationService } from 'src/app/core/services/translation/translation.service'
import { likeFeedPublicationModel } from 'src/app/core/models/publication-options/like.model'
import { ValidationsComponent } from 'src/app/core/modal/validations/validations.component'
import { IconAnimation } from 'src/assets/route-animation/icon-animation'
import { TranslateService } from '@ngx-translate/core'
import { CommentModel } from 'src/app/core/models/comment/comment.model'
import { Observable } from 'rxjs'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { filter, skipWhile } from 'rxjs/operators'
import { CommentFeedPublication } from 'src/app/core/models/comment/comment-publication.model'
import { PublicationModalComponent } from 'src/app/core/modal/publication-modal/publication-modal.component'

@Component({
  selector: 'app-feed-page-admin-standard',
  templateUrl: './feed-page-admin-standard.component.html',
  styleUrls: ['./feed-page-admin-standard.component.scss'],
  animations: [IconAnimation]
})

export class FeedPageAdminStandardComponent implements OnInit, OnDestroy {

  // profile
  profile$: Observable<ProfileModel>

  // like
  numberLike: number
  isLiked: boolean
  btnLikeClicked = false

  // comment
  comment: CommentModel
  numberComment: number
  defaultComment: string
  taggedProfile: ProfileModel[] = []

  // new comment
  validComment = false
  friendTag: any[] = []
  activeSearch = false
  pseudoSearch: string
  resultsProfile$: Observable<ProfileModel[]>
  @ViewChild('newComment', { static: false }) commentWrited: ElementRef;
  spotSearch$: Observable<string>

  // play
  playVideo = false
  @ViewChild('video', { static: false }) myVideo: ElementRef;

  // input 
  @Input() publication: PicturePublication | PostPublication | VideoPublication | any
  @Input() space: string

  constructor(
    private store$: Store<RootStoreState.State>,
    private dialog: MatDialog,
    private translationService: TranslationService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {

    // sort by type for the list
    this.numberLike = this.publication.like.likeNumber
    this.isLiked = this.publication.like.isLike

    // set the button like
    if (this.isLiked === true) { this.isLiked = true }

    // load my profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile),
      skipWhile(value => value == null)
    )

    // profile tagged
    if (this.publication.profileTagged) {
      this.taggedProfile = this.publication.profileTagged
    }

    // tag friend
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      filter(val => !!val),
      skipWhile(val => val.length == 0),
    )

    // to select list of friend
    this.spotSearch$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSpot),
      filter(val => !!val),
      skipWhile(val => val == null)
    )

    // to set the design of the placeholder
    this.defaultComment = this.translate.instant('PLACEHOLDER.Your-Comment..')

  }

  btnLike() {

    if (this.publication.page._id === null) return null

    // to like the publications
    if (!this.isLiked) {
      const like = new likeFeedPublicationModel(this.publication.page._id, 'publication', this.publication._id, 'page', this.publication.hastags)
      this.store$.dispatch(new PushLikeFeatureStoreActions.AddLike(like))
      ++this.numberLike
      this.isLiked = true
      this.btnLikeClicked = true
    }
    // to dislike the publications
    else {
      this.store$.dispatch(new PushLikeFeatureStoreActions.DeleteLike(this.publication._id))
      --this.numberLike
      this.isLiked = false
      this.btnLikeClicked = true
    }
  }

  delete(id: string) {
    // to open the deletion modal
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id, type: 'feed-publication-delete' }
    })
  }

  report(publication:FeedPublication) {
    // to open the report modal
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { publication, type: 'feed-publication-report' }
    })
  }

  updateStoreLike() {
    // to update the like in the store
    if (this.isLiked) this.store$.dispatch(new FeedPublicationStoreActions.UpdateLike(this.publication._id))
    else this.store$.dispatch(new FeedPublicationStoreActions.UpdateDisLike(this.publication._id))
  }

  startVideo() {
    // to hide the logo play
    this.playVideo = !this.playVideo
  }

  getDateCreation(date: Date): String {
    // to get the creation date
    return this.translationService.getDateTranslated(date)
  }

  sendComment() {
    // to send a comment
    const profileList = this.listTag()
    const comment = new CommentFeedPublication(profileList, this.commentWrited.nativeElement.innerText, null, null, this.publication._id, this.publication.page._id)
    this.store$.dispatch(new CommentFeatureStoreActions.AddCommentWithoutTrend(comment, 'page'));
    this.numberComment += 1
    this.commentWrited.nativeElement.blur()
    this.commentWrited.nativeElement.innerHTML = this.translate.instant('PLACEHOLDER.Your-Comment..')
  }

  writeComment(event: KeyboardEvent) {

    // start the search
    if (event.key == '@') {
      this.activeSearch = true
      this.pseudoSearch = ''
      return
    }

    // stop when we are not in a research
    if (this.activeSearch) {

      // cancel the search
      if (event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
        this.activeSearch = false
        this.pseudoSearch = ''
        return
      }

      // if backspace
      if (event.key == 'Backspace') {
        if (this.pseudoSearch.length == 0) {
          this.activeSearch = false
          this.pseudoSearch = ''
          this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)
          return
        } else {
          this.pseudoSearch = this.pseudoSearch.slice(0, -1);
          return
        }
      }

      // complete the search
      if (this.activeSearch == true) return this.searchFriend(event.key)

    }

  }

  searchFriend(letter: string) {
    // to add new letter in the searching
    this.pseudoSearch += letter
    this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(this.pseudoSearch, 'feed-publication-standard' + this.publication._id))
  }

  addTag(profile: ProfileModel) {

    // to reset all the suggestion
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)

    // to add the @ in the text
    this.commentWrited.nativeElement.innerHTML += ' '
    this.commentWrited.nativeElement.innerHTML =
      this.commentWrited.nativeElement.innerHTML.replace(
        '@' + this.pseudoSearch + ' ',
        '<strong id="profile-' + profile._id + '" class="d-inline-block" contenteditable="false" style="font-weight: 100; font-size: 1.05rem; color: #8a72ee; font-family: \'Pacifico\'">@'
        + profile._meta.pseudo + '<span hidden class="oneTag">' + profile._id + '</span> </strong>' + '&nbsp;'
      )
      
      // to set the cursor at the end
    this.placeCaretAtEnd(this.commentWrited.nativeElement)

  }

  listTag(): string[] {

    // to get the comment 
    let commentSend = this.commentWrited.nativeElement

    // to check if the username is in the text
    if (commentSend.getElementsByClassName("oneTag").length !== 0) {
      let listProfile: string[] = []
      for (let p of commentSend.getElementsByClassName("oneTag") as any) {
        listProfile.push(p.innerText)
      }
      return listProfile
    }
  }

  placeCaretAtEnd(el: any) {
    // to set the position of the cursor
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  focusComment(): void {
    // to change the placeholder
    if (this.commentWrited.nativeElement.innerText == this.defaultComment) {
      this.commentWrited.nativeElement.innerHTML = this.commentWrited.nativeElement.innerText.replace(this.defaultComment, '')
    }
  }

  openModal() {

    // to open the modal for the publications
    if (this.playVideo) this.myVideo.nativeElement.pause()
    if (this.isLiked) this.publication.like.isLike = true
    else this.publication.like.isLike = false

    const dialogRef = this.dialog.open(PublicationModalComponent, {
      panelClass: ['col-md-9', 'col-xl-8'],
      data: { publication: this.publication, ownerId: this.publication.page._id }
    })

    // add a lister to update the design for the stat
    const sub = dialogRef.componentInstance.onAdd.subscribe((action: string) => {
      if (action == 'liked') {
        ++this.numberLike
        this.isLiked = true
        this.btnLikeClicked = true
      } else {
        --this.numberLike
        this.isLiked = false
        this.btnLikeClicked = false
      }
    })

    // to unsubscribe the listener after close the modal
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe()
    })
  }

  ngOnDestroy(): void {
    // to unsunscribe all var
    if (this.btnLikeClicked) this.updateStoreLike()
  }

}