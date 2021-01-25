import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skipWhile } from 'rxjs/operators';
import { RootStoreState, SearchProfileStoreActions, SearchProfileStoreSelectors } from 'src/app/root-store';
import { musicGenre, NameAndCode } from '../../data/music-genre';
import { ProfileModel } from '../../models/baseUser/profile.model';

@Component({
  selector: 'app-credit-music',
  templateUrl: './credit-music.component.html',
  styleUrls: ['./credit-music.component.scss']
})

export class CreditMusicComponent implements OnInit, OnDestroy {

  // parent
  onAdd = new EventEmitter();

  // input
  interpreter: string
  writter: string
  producer: string
  category: FormControl
  friendSearch: FormControl

  // confirmation
  musicCredit: MusicCredit = null

  // data
  musicGenres: NameAndCode[] = []
  resultsProfile$: Observable<ProfileModel[]>

  constructor(
    public dialogRef: MatDialogRef<CreditMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MusicCredit,
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit(): void {

    // initialize
    this.musicCredit = {
      name: this.data.name,
      index: this.data.index,
      interpreters: this.data.interpreters || [],
      writters: this.data.writters || [],
      producers: this.data.producers || [],
      feat: this.data.feat || [],
      categories: this.data.categories || []
    }

    // format the search bar for the form
    this.category = new FormControl()
    this.category.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        filter(x => !!x)
      )
      .subscribe(q => {
        this.musicGenres = musicGenre.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
      })

    // format the search for the friends
    this.friendSearch = new FormControl()
    this.friendSearch.valueChanges
      .pipe(
        filter(value => value !== undefined || value !== ''),
        filter(value => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'album')))

    // to select the profile list 
    this.resultsProfile$ = this.store$.pipe(
      select(SearchProfileStoreSelectors.selectSearchResults),
      skipWhile(val => val === null),
      filter(x => x.length > 0)
    )

  }

  addFeat(item: ProfileModel) {
    this.musicCredit.feat.push(item)
    this.friendSearch.setValue('')
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch())
  }

  removeFriend(i: number) {
    this.musicCredit.feat.splice(i, 1)
  }

  addCategory(item: NameAndCode) {
    this.musicCredit.categories.push(item)
    this.category.setValue('')
  }

  removeCategory(i: number) {
    this.musicCredit.categories.splice(i, 1)
  }

  addNewRole(role: string) {
    switch (role) {
      case 'interpreter': {
        this.musicCredit.interpreters.push(this.interpreter)
        this.interpreter = null
        break;
      }
      case 'writter': {
        this.musicCredit.writters.push(this.writter)
        this.writter = null
        break;
      }
      case 'producer': {
        this.musicCredit.producers.push(this.producer)
        this.producer = null
        break;
      }
    }
  }

  removeRole(type: string, i: number) {
    switch (type) {
      case 'interpreter': {
        this.musicCredit.interpreters.splice(i, 1)
        this.interpreter = null
        break;
      }
      case 'writter': {
        this.musicCredit.writters.splice(i, 1)
        this.writter = null
        break;
      }
      case 'producer': {
        this.musicCredit.producers.splice(i, 1)
        this.producer = null
        break;
      }
    }
  }

  confirm() {
    this.onAdd.emit(this.musicCredit)
    this.dialogRef.close()
  }

  ngOnDestroy(): void {
    this.onAdd.unsubscribe()
  }

}





export interface CreditName {
  index: number
  name: string
  role: string
}

export interface MusicCredit {
  name: string
  index: number
  interpreters: string[] | any[]
  writters: string[]
  producers: string[]
  feat: ProfileModel[]
  categories: NameAndCode[]
}