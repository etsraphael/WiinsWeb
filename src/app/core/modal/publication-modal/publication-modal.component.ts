import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, EventEmitter } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, skipWhile } from 'rxjs/operators'
import { ProfileModel } from '../../models/baseUser/profile.model'
import { PicturePublication, PostPublication, VideoPublication } from '../../models/publication/feed/feed-publication.model'
import {
  SearchProfileStoreSelectors, CommentFeatureStoreSelectors, RootStoreState, CommentFeatureStoreActions,
  ProfileFeatureStoreSelectors, PushLikeFeatureStoreActions, ResponseFeatureStoreActions, ResponseFeatureStoreSelectors,
  SearchProfileStoreActions,
  FeedPublicationByIdStoreActions,
} from 'src/app/root-store'
import { likeFeedPublicationModel, likeCommentPublicationModel } from '../../models/publication-options/like.model'
import { CommentFeedPublication } from '../../models/comment/comment-publication.model'
import { ValidationsComponent } from '../validations/validations.component'
import { TranslationService } from '../../services/translation/translation.service'
import { ProfileListComponent } from '../profile-list/profile-list.component'
import { CommentModel } from '../../models/comment/comment.model'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-publication-modal',
  templateUrl: './publication-modal.component.html',
  styleUrls: ['./publication-modal.component.scss'],
})

export class PublicationModalComponent implements OnInit, OnDestroy {

  // pageOrProfile
  pageOrProfile: string
  mypageId = false

  // comment
  comment$: Observable<CommentModel[]>
  numberComment: number
  @ViewChild('newComment', { static: false }) commentWrited: ElementRef;

  // response
  response$: Observable<CommentModel[]>
  response: CommentModel
  indexResponse: number

  // like
  numberLike: number
  isLiked: boolean

  // myprofile
  linkProfil = '/profile/'
  pictureProfile: String
  profile: ProfileModel
  myprofile: Observable<ProfileModel>

  // link page or profile
  link: string
  name: string
  idOwner: string
  avatarPublication: string

  // tag
  activeSearch = false
  pseudoSearch: string
  resultsProfile$: Observable<ProfileModel[]>

  // parent
  onAdd = new EventEmitter();

  constructor(
    private store$: Store<RootStoreState.State>,
    public dialogRef: MatDialogRef<PublicationModalComponent>,
    public translateService: TranslationService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { publication: PicturePublication | PostPublication | VideoPublication | any, ownerId: string }
  ) { }

  ngOnInit() {

    // initialize each path 
    switch (true) {
      case this.data.publication.hasOwnProperty('profile'):
        this.avatarPublication = this.data.publication.profile.pictureprofile;
        this.link = '/profile/' + this.data.publication.profile._id;
        this.name = this.data.publication.profile._meta.pseudo;
        this.idOwner = this.data.publication.profile._id;
        this.pageOrProfile = 'profile';
        break;
      case this.data.publication.hasOwnProperty('page'):
        this.avatarPublication = this.data.publication.page.pictureprofile
        this.link = '/page/' + this.data.publication.page._id;
        this.name = this.data.publication.page.name;
        this.idOwner = this.data.publication.page._id;
        this.pageOrProfile = 'page';
        break;
    }

    // get the stat
    this.numberComment = this.data.publication.commentNumber
    this.numberLike = this.data.publication.like.likeNumber
    this.isLiked = this.data.publication.like.isLike

    // to get the comment
    this.store$.dispatch(new CommentFeatureStoreActions.LoadCommentById('1', this.data.publication._id));

    // to select the comment
    this.comment$ = this.store$.pipe(
      select(CommentFeatureStoreSelectors.selectAllCommentFeatureItems),
      filter(value => value !== undefined),
      skipWhile(val => val === null)
    )

    // get the profile
    this.myprofile = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile)
    );

    // to know if you are the admin
    this.myprofile.subscribe(profile => {
      this.profile = profile;
      this.pictureProfile = this.profile.pictureprofile;
      if (
        this.data.publication.hasOwnProperty('page') &&
        typeof profile.adminsPage.filter(x => x !== this.data.publication.page._id)[0] !== 'undefined') {
        this.mypageId = true;
      }
    });

    // set the button like
    if (this.isLiked === true) {
      this.isLiked = true;
    }

    // response comment
    this.response$ = this.store$.pipe(
      select(ResponseFeatureStoreSelectors.selectAllCommentFeatureItems),
      skipWhile(val => val === []),
      filter(value => value !== undefined),
    )

    // tag friend
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      filter(value => value !== undefined),
    )

  }

  btnLike() {

    // like 
    if (this.isLiked === false) {
      const like = new likeFeedPublicationModel(this.data.ownerId, 'feed-publication', this.data.publication._id, this.pageOrProfile, this.data.publication.hastags)
      this.store$.dispatch(new PushLikeFeatureStoreActions.AddLike(like));
      this.numberLike += 1;
      this.isLiked = true;
      this.onAdd.emit('liked');
    }
    // dislike
    else {
      this.store$.dispatch(new PushLikeFeatureStoreActions.DeleteLike(this.data.publication._id));
      this.numberLike -= 1;
      this.isLiked = false;
      this.onAdd.emit('disliked');
    }
  }

  btnLikeComment(comment: CommentModel) {

    // like a comment 
    if (!comment.liked) {
      const likeComment = new likeCommentPublicationModel(comment.idProfil._id, 'base', comment._id, this.data.publication._id, this.pageOrProfile)
      this.store$.dispatch(new PushLikeFeatureStoreActions.AddLikeComment(likeComment))
      this.store$.dispatch(new CommentFeatureStoreActions.UpdateLike(comment._id))
    }
    // dislike a comment
    else {
      this.store$.dispatch(new PushLikeFeatureStoreActions.DeleteLikeComment(comment._id))
      this.store$.dispatch(new CommentFeatureStoreActions.UpdateDisLike(comment._id))
    }
  }

  createResponse(index: number) {
    // show the response textarea
    this.indexResponse = index
  }

  sendResponse(response: HTMLInputElement, comment: CommentModel) {
    // send the response
    const c = new CommentFeedPublication(null, response.innerText, comment._id, comment.idProfil._id, this.data.publication._id, this.data.publication.profile._id)
    this.store$.dispatch(new ResponseFeatureStoreActions.AddResponse(c))
    this.store$.dispatch(new CommentFeatureStoreActions.UpgradeRespond(comment))
    this.indexResponse = null
    this.store$.dispatch(new ResponseFeatureStoreActions.LoadResponseById('1', comment._id));
  }

  ngOnDestroy(): void {
    // reset all modal store
    this.store$.dispatch(new CommentFeatureStoreActions.ResetComment)
    this.store$.dispatch(new FeedPublicationByIdStoreActions.ResetPublicationById)
  }

  showReponse(id: string) {
    // show response list
    this.store$.dispatch(new ResponseFeatureStoreActions.LoadResponseById('1', id))
  }

  sendComment() {
    // send new comment
    const profileList = this.listTag()
    const comment = new CommentFeedPublication(profileList, this.commentWrited.nativeElement.innerText, null, null, this.data.publication._id, this.idOwner)
    this.store$.dispatch(new CommentFeatureStoreActions.AddComment(comment, this.pageOrProfile));
    this.numberComment += 1
    this.commentWrited.nativeElement.innerHTML = null
  }

  focusComment() {
    // to focus the new comment 
    this.commentWrited.nativeElement.focus();
  }

  btnLikeResponse(comment: CommentModel) {

    // like a response
    if (!comment.liked) {
      const likeComment = new likeCommentPublicationModel(comment.commentProfile._id, 'base', comment._id, this.data.publication._id, this.pageOrProfile)
      this.store$.dispatch(new PushLikeFeatureStoreActions.AddLikeComment(likeComment))
      this.store$.dispatch(new ResponseFeatureStoreActions.UpdateLike(comment._id))
    }
    // dislike a response
    else {
      this.store$.dispatch(new PushLikeFeatureStoreActions.DeleteLikeComment(comment._id))
      this.store$.dispatch(new ResponseFeatureStoreActions.UpdateDislike(comment._id))
    }

  }

  deleteComment(commentID: string) {

    // to open the modal to delete the comment
    const dialogRef = this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4', 'col-xl-4'],
      data: { id: commentID, publication: this.data.publication, type: 'delete-comment' }
    })

    // add a listener to update the stat
    const sub = dialogRef.componentInstance.onAction.subscribe((action: string) => {
      if (action == 'deleted') --this.numberComment
    })

    // unsubscribe the modal after to close the dialog
    dialogRef.afterClosed().subscribe(() => sub.unsubscribe())

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
    // add a letter in the new searching
    this.pseudoSearch += letter
    this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(this.pseudoSearch, 'modalFeedPublicationStandard'))
  }

  addTag(profile: ProfileModel) {

    // reset the suggestion list
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)

    // update the new text with the @
    this.commentWrited.nativeElement.innerHTML += ' '
    this.commentWrited.nativeElement.innerHTML =
      this.commentWrited.nativeElement.innerHTML.replace(
        '@' + this.pseudoSearch + ' ',
        '<strong id="profile-' + profile._id + '" class="d-inline-block" contenteditable="false" style="font-weight: 100; font-size: 1.05rem; color: #8a72ee; font-family: \'Pacifico\'">@'
        + profile._meta.pseudo + '<span hidden class="oneTag">' + profile._id + '</span> </strong>' + '&nbsp;'
      )

    // set the cursor position
    this.placeCaretAtEnd(this.commentWrited.nativeElement)

  }

  listTag(): string[] {

    let commentSend = document.getElementsByClassName("content-comment-span")[0]

    // get the tag profile
    if (commentSend.getElementsByClassName("oneTag").length !== 0) {
      let listProfile: string[] = []
      for (let p of commentSend.getElementsByClassName("oneTag") as any) {
        listProfile.push(p.innerText)
      }
      return listProfile
    } else { return null }

  }

  placeCaretAtEnd(el) {
    // set the cursor position
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

  closeModal() {
    // to close the modal
    this.dialogRef.close()
  }

  openLikedList() {

    // show the profile list who liked 
    if (this.numberLike > 0) {
      return this.dialog.open(ProfileListComponent, {
        panelClass: 'col-3',
        data: { categorie: 'liked-list', id: this.data.publication._id }
      })
    } else return null

  }

}
