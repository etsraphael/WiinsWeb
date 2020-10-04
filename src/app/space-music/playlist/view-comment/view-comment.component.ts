import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import {
  RootStoreState, CommentFeatureStoreActions, CommentFeatureStoreSelectors, ProfileFeatureStoreSelectors,
  PushLikeFeatureStoreActions, ResponseFeatureStoreActions, ResponseFeatureStoreSelectors, SearchProfileStoreActions,
  SearchProfileStoreSelectors
} from 'src/app/root-store'
import { Observable } from 'rxjs'
import { CommentModel } from 'src/app/core/models/comment/comment.model'
import { filter, skipWhile } from 'rxjs/operators'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { commentPlaylist } from 'src/app/core/models/comment/comment-playlist.model'
import { likeCommentPlaylistModel } from 'src/app/core/models/publication-options/like.model'

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss']
})

export class ViewCommentComponent implements OnInit, OnDestroy {

  // playlist
  playlistId: string

  // comment
  comment$: Observable<CommentModel[]>
  myprofile$: Observable<ProfileModel>
  validComment = true
  @ViewChild('newComment', { static: false }) commentWrited: ElementRef;

  // response
  response$: Observable<CommentModel[]>
  response: CommentModel
  responseInput: string = null
  indexResponse: number

  // search
  activeSearch = false
  pseudoSearch: string
  friendTag: any[] = []
  resultsProfile$: Observable<ProfileModel[]>

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

    // load the comments
    this.playlistId = this.route.snapshot.paramMap.get('id');
    this.store$.dispatch(new CommentFeatureStoreActions.LoadCommentPlaylist('1', this.playlistId));

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to select all the comments
    this.comment$ = this.store$.pipe(
      select(CommentFeatureStoreSelectors.selectAllCommentFeatureItems),
      skipWhile(val => val.length === 0),
      filter(value => value !== undefined),
    )

    // to select the response of a comment
    this.response$ = this.store$.pipe(
      select(ResponseFeatureStoreSelectors.selectAllCommentFeatureItems),
      skipWhile(val => val === []),
      filter(value => value !== undefined),
    )

    // to select all the suggestion profile
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      skipWhile(val => val === null),
    )
  }

  sendComment() {

    // to check tagged friends
    const profileList = this.listTag()

    // to send the comment
    const comment = new commentPlaylist(profileList, this.commentWrited.nativeElement.innerText, null, null, this.playlistId)
    this.store$.dispatch(new CommentFeatureStoreActions.AddComment(comment, 'playlist'))

    // to reset the comment input 
    this.commentWrited.nativeElement.innerHTML = null

  }

  btnLikeComment(comment: CommentModel) {

    // to like the music
    if (!comment.liked) {
      const likeComment = new likeCommentPlaylistModel(comment.idProfil._id, 'base', comment._id, this.playlistId)
      this.store$.dispatch(new PushLikeFeatureStoreActions.AddLikeComment(likeComment))
    }
    // to dislike the music
    else {
      this.store$.dispatch(new PushLikeFeatureStoreActions.DeleteLikeComment(comment._id))
    }

  }

  createResponse(index: number) {
    // to show the input under the comment
    this.indexResponse = index
  }

  showReponse(idComment: string) {
    // to load the response
    this.store$.dispatch(new ResponseFeatureStoreActions.LoadResponsePlaylist('1', idComment));
  }

  onScrollUp() {
    // to load more comment
    this.store$.dispatch(new CommentFeatureStoreActions.LoadCommentPlaylist('2', this.playlistId));
  }

  verifyId() {
    // to know if the user taged is still there
    for (let profile of this.friendTag) {
      if (document.getElementById('newComment').innerText.indexOf('@' + profile.pseudo) == -1) {
        this.friendTag = this.friendTag.filter(obj => obj.pseudo !== profile.pseudo)
      }
    }
    return this.friendTag.map(x => x.id)
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
    // to update the search
    this.pseudoSearch += letter
    this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(this.pseudoSearch, 'modalFeedPublicationStandard'))
  }

  addTag(profile: ProfileModel) {

    // to reset the suggestion bar
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)

    // to replace put the @ in the comment
    this.commentWrited.nativeElement.innerHTML += ' '
    this.commentWrited.nativeElement.innerHTML =
      this.commentWrited.nativeElement.innerHTML.replace(
        '@' + this.pseudoSearch + ' ',
        '<strong id="profile-' + profile._id + '" class="d-inline-block" contenteditable="false" style="font-weight: 100; font-size: 1.05rem; color: #8a72ee; font-family: \'Pacifico\'">@'
        + profile._meta.pseudo + '<span hidden class="oneTag">' + profile._id + '</span> </strong>' + '&nbsp;'
      )

    // to set the cursor
    this.placeCaretAtEnd(this.commentWrited.nativeElement)

  }

  listTag(): string[] {
    // to get the list tagged
    let commentSend = document.getElementsByClassName("content-comment-span")[0]
    if (commentSend.getElementsByClassName("oneTag").length !== 0) {
      let listProfile: string[] = []
      for (let p of commentSend.getElementsByClassName("oneTag") as any) {
        listProfile.push(p.innerText)
      }
      return listProfile
    } else { return null }
  }

  placeCaretAtEnd(el) {
    // to set the cursor at the end of the comment
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

  sendResponse(response: HTMLInputElement, comment: CommentModel) {

    // to create the comment
    const c = new commentPlaylist(null, response.innerText, comment._id, comment.idProfil._id, this.playlistId)

    // to send the comment
    this.store$.dispatch(new ResponseFeatureStoreActions.AddResponse(c))
    this.store$.dispatch(new CommentFeatureStoreActions.UpgradeRespond(comment))

    // to reset the input
    this.indexResponse = null
    
  }

  ngOnDestroy(): void {
    // to reset the comment
    this.store$.dispatch(new CommentFeatureStoreActions.ResetComment)
  }

}