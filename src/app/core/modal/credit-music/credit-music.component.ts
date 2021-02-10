import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skipWhile, take } from 'rxjs/operators';
import { ProfileFeatureStoreSelectors, RootStoreState, SearchProfileStoreActions, SearchProfileStoreSelectors } from 'src/app/root-store';
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

  // my profile
  myprofile$: Observable<ProfileModel>

  // selects
  interpreterIsMe = false
  writterIsMe = false
  producerIsMe = false

  constructor(
    public dialogRef: MatDialogRef<CreditMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MusicCredit,
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit(): void {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile)
    )

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
        this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
          if (profile._meta.pseudo == this.musicCredit.interpreters[i]) this.interpreterIsMe = false
        })
        this.musicCredit.interpreters.splice(i, 1)
        this.interpreter = null
        break;
      }
      case 'writter': {
        this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
          if (profile._meta.pseudo == this.musicCredit.writters[i]) this.writterIsMe = false
        })
        this.musicCredit.writters.splice(i, 1)
        this.writter = null
        break;
      }
      case 'producer': {
        this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
          if (profile._meta.pseudo == this.musicCredit.producers[i]) this.producerIsMe = false
        })
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

  setMyRole(event: MatCheckboxChange, type: string): Subscription {

    if (event.checked) {
      switch (type) {
        case 'interpreter': {
          return this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
            this.musicCredit.interpreters.push(profile._meta.pseudo)
            this.interpreterIsMe = true
          })
        }
        case 'writter': {
          return this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
            this.musicCredit.writters.push(profile._meta.pseudo)
            this.writterIsMe = true
          })
        }
        case 'producer': {
          return this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
            this.musicCredit.producers.push(profile._meta.pseudo)
            this.producerIsMe = true
          })
        }
      }
    } else {
      switch (type) {
        case 'interpreter': {
          return this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
            const index = this.musicCredit.interpreters.indexOf(profile._meta.pseudo)
            this.musicCredit.interpreters.splice(index, 1)
          })
        }
        case 'writter': {
          return this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
            const index = this.musicCredit.writters.indexOf(profile._meta.pseudo)
            this.musicCredit.writters.splice(index, 1)
          })
        }
        case 'producer': {
          return this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {
            const index = this.musicCredit.producers.indexOf(profile._meta.pseudo)
            this.musicCredit.producers.splice(index, 1)
          })
        }
      }
    }


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
  writters: string[] | any[]
  producers: string[] | any[]
  feat: ProfileModel[] | any[]
  categories: NameAndCode[]
}