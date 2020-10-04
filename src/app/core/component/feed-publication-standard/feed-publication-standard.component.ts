import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { filter, skipWhile, take } from 'rxjs/operators'
import {
  ProfileFeatureStoreSelectors, RootStoreState, CommentFeatureStoreActions, PushLikeFeatureStoreActions,
  SearchProfileStoreActions, SearchProfileStoreSelectors, FeedPublicationStoreActions
} from 'src/app/root-store'
import { PublicationModalComponent } from '../../modal/publication-modal/publication-modal.component'
import { IconAnimation } from 'src/assets/route-animation/icon-animation'
import { MatDialog, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router';
import { ProfileModel } from '../../models/baseUser/profile.model'
import { PicturePublication, PostPublication, VideoPublication, FeedPublication } from '../../models/publication/feed/feed-publication.model'
import { likeFeedPublicationModel } from '../../models/publication-options/like.model'
import { ValidationsComponent } from '../../modal/validations/validations.component'
import { CommentFeedPublication } from '../../models/comment/comment-publication.model'
import { TranslationService } from '../../services/translation/translation.service'
import { TranslateService } from '@ngx-translate/core'
import { ProfileListComponent } from '../../modal/profile-list/profile-list.component'
import { ReportModalComponent } from '../../modal/report-modal/report-modal.component'
import { CommentModel } from '../../models/comment/comment.model'

@Component({
  selector: 'app-feed-publication-standard',
  templateUrl: './feed-publication-standard.component.html',
  styleUrls: ['./feed-publication-standard.component.scss'],
  animations: [IconAnimation]
})

export class FeedPublicationStandardComponent implements OnInit, OnDestroy {

  @Input() publication: PicturePublication | PostPublication | VideoPublication | any
  @Input() space: string
  pictureProfile: String
  profile$: Observable<ProfileModel>
  profileSubscription: Subscription
  ownerId: string
  mypageId = false
  mygroup = false

  // pageOrProfile
  pageOrProfile: string

  // comment
  comment: CommentModel
  numberComment: number
  defaultComment: string

  // new comment
  validComment = false
  friendTag: any[] = []
  activeSearch = false
  pseudoSearch: string
  resultsProfile$: Observable<ProfileModel[]>
  @ViewChild('newComment', { static: false }) commentWrited: ElementRef
  spotSearch$: Observable<string>

  // like
  numberLike: number
  isLiked: boolean
  btnLikeClicked = false

  // link page or profile
  link: string
  name: string
  avatarPublication: string
  taggedProfile: ProfileModel[] = []

  // play
  playVideo = false
  @ViewChild('video', { static: false }) myVideo: ElementRef

  constructor(
    private store$: Store<RootStoreState.State>,
    private dialog: MatDialog,
    private router: Router,
    private translationService: TranslationService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {

    // information to update after actions
    this.numberComment = this.publication.commentNumber
    this.numberLike = this.publication.like.likeNumber
    this.isLiked = this.publication.like.isLike

    // load my profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile),
      skipWhile(value => value == null)
    )

    // subscribe my profile
    this.profileSubscription = this.profile$.subscribe((profile: ProfileModel) => {
      if (
        this.publication.hasOwnProperty('page')
        && typeof profile.adminsPage.filter(x => x !== this.publication.page._id)[0] !== 'undefined'
      ) { this.mypageId = true }
    })

    // link for page and profile
    switch (true) {
      case this.publication.hasOwnProperty('profile'):
        this.ownerId = this.publication.profile._id
        this.pageOrProfile = 'profile'
        this.avatarPublication = this.publication.profile.pictureprofile
        this.link = '/profile/' + this.publication.profile._id
        this.name = this.publication.profile._meta.pseudo
        break
      case this.publication.hasOwnProperty('page'):
        this.ownerId = this.publication.page._id
        this.pageOrProfile = 'page'
        this.avatarPublication = this.publication.page.pictureprofile
        this.link = '/page/' + this.publication.page._id
        this.name = this.publication.page.name
        break
    }

    // show profile tagged 
    if (this.publication.profileTagged) {
      this.taggedProfile = this.publication.profileTagged
    }

    // set the button like
    if (this.isLiked === true) { this.isLiked = true }

    // tag friend
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      filter(val => !!val),
      skipWhile(val => val.length == 0),
    )

    // friends suggestions for the tag
    this.spotSearch$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSpot),
      filter(val => !!val),
      skipWhile(val => val == null)
    )

    // check if you are a admin of the group
    if (this.space == 'story-group') {
      this.profile$.pipe(take(1)).subscribe(action => {
        if (action.adminsGroup.includes(this.publication.group._id)) this.mygroup = true
      })
    }

    // default placeholder
    this.defaultComment = this.translate.instant('PLACEHOLDER.Your-Comment..')
  }

  openModal(): void {

    // play pause if it's a video
    if (this.playVideo) this.myVideo.nativeElement.pause()

    // update the like btn 
    if (this.isLiked) this.publication.like.isLike = true
    else this.publication.like.isLike = false

    // open the modal
    const dialogRef = this.dialog.open(PublicationModalComponent, {
      panelClass: ['col-md-9', 'col-xl-8'],
      data: { 
        publication: {
          ...this.publication,
          like: {
            ...this.publication.like,
            likeNumber: this.numberLike
          }
        },
        ownerId: this.ownerId
      }
    })

    // add a listener to update the stat
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

    // unsubscribe the modal after to close the dialog
    dialogRef.afterClosed().subscribe(() => sub.unsubscribe())

  }

  btnLike(): void {

    // if the publications don't have an id
    if (this.ownerId === null) return null

    // we like 
    if (!this.isLiked) {
      const like = new likeFeedPublicationModel(this.ownerId, 'feed-publication', this.publication._id, this.pageOrProfile, this.publication.hastags)
      this.store$.dispatch(new PushLikeFeatureStoreActions.AddLike(like))
      ++this.numberLike
      this.isLiked = true
      this.btnLikeClicked = true
    }
    // we dislike
    else {
      this.store$.dispatch(new PushLikeFeatureStoreActions.DeleteLike(this.publication._id))
      --this.numberLike
      this.isLiked = false
      this.btnLikeClicked = true
    }

  }

  delete(id: string): MatDialogRef<ValidationsComponent> {

    // open the modal to delete the publications
    return this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id, type: 'feed-publication-delete' }
    })

  }

  report(publication: FeedPublication): MatDialogRef<ReportModalComponent> {

    // open the modal to report the publications
    return this.dialog.open(ReportModalComponent, {
      panelClass: ['col-md-10'],
      data: { publication, type: 'feed-publication-report' }
    })

  }

  verifyId(): string[] {

    // check if the tagged friends it's in the list
    for (let profile of this.friendTag) {
      if (document.getElementById('newComment' + this.publication.id).innerText.indexOf('@' + profile.pseudo) == -1) {
        this.friendTag = this.friendTag.filter(obj => obj.pseudo !== profile.pseudo)
      }
    }

    // get only the ids in the list of array 
    return this.friendTag.map(x => x.id)

  }

  ngOnDestroy(): void {

    // unsubscribe all the var
    this.profileSubscription.unsubscribe()
    if (this.btnLikeClicked) this.updateStoreLike()

  }

  updateStoreLike(): void {

    // update the design after liked/disliked
    if (this.isLiked) return this.store$.dispatch(new FeedPublicationStoreActions.UpdateLike(this.publication._id))
    else return this.store$.dispatch(new FeedPublicationStoreActions.UpdateDisLike(this.publication._id))

  }

  startVideo(): void {

    // hide the play logo for the video
    this.playVideo = !this.playVideo

  }

  sendComment(): void {

    // get the tagged friends 
    const profileList = this.listTag()

    // create the comment object 
    const comment = new CommentFeedPublication(
      profileList,
      this.commentWrited.nativeElement.innerText,
      null,
      null,
      this.publication._id,
      this.ownerId
    )

    // send the comment in the actions 
    this.store$.dispatch(new CommentFeatureStoreActions.AddCommentWithoutTrend(comment, this.pageOrProfile))

    // update the design and the stat
    this.numberComment += 1
    this.commentWrited.nativeElement.blur()
    this.commentWrited.nativeElement.innerHTML = this.translate.instant('PLACEHOLDER.Your-Comment..')

  }

  writeComment(event: KeyboardEvent): void {

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

  searchFriend(letter: string): void {

    // add letter and search 
    this.pseudoSearch += letter
    this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(this.pseudoSearch, 'feed-publication-standard' + this.publication._id))

  }

  addTag(profile: ProfileModel): void {

    // reset the suggestion
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)

    // update the name in the text
    this.commentWrited.nativeElement.innerHTML += ' '
    this.commentWrited.nativeElement.innerHTML =
      this.commentWrited.nativeElement.innerHTML.replace(
        '@' + this.pseudoSearch + ' ',
        '<strong id="profile-' + profile._id + '" class="d-inline-block" contenteditable="false" style="font-weight: 100; font-size: 1.05rem; color: #8a72ee; font-family: \'Pacifico\'">@'
        + profile._meta.pseudo + '<span hidden class="oneTag">' + profile._id + '</span> </strong>' + '&nbsp;'
      )

    // place the cursor at the end  
    this.placeCaretAtEnd(this.commentWrited.nativeElement)

  }

  listTag(): string[] {

    let commentSend = this.commentWrited.nativeElement

    // check if the friends tagged is still here
    if (commentSend.getElementsByClassName("oneTag").length !== 0) {
      let listProfile: string[] = []
      for (let p of commentSend.getElementsByClassName("oneTag") as any) {
        listProfile.push(p.innerText)
      }
      return listProfile
    }
  }

  placeCaretAtEnd(el: any): void {

    // set the cursor at the end of the text
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

  redirectionToHastag(name: string): Promise<boolean> {

    // go to the discover with the hastag
    return this.router.navigate(['/SpaceDiscover/' + name])

  }

  getDateCreation(date: Date): String {

    // get the translation of the date
    return this.translationService.getDateTranslated(date)

  }

  focusComment(): void {

    // set the comment after to focus on it 
    if (this.commentWrited.nativeElement.innerText == this.defaultComment) {
      this.commentWrited.nativeElement.innerHTML = this.commentWrited.nativeElement.innerText.replace(this.defaultComment, '')
    }

  }

  openLikedList(): MatDialogRef<ProfileListComponent>  {

    // show the profile list who liked 
    if (this.numberLike > 0) {
      return this.dialog.open(ProfileListComponent, {
        panelClass: 'col-3',
        data: { categorie: 'liked-list', id: this.publication._id }
      })
    } else return null

  }

}