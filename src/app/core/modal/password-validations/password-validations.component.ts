import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState,  MusicProjectStoreSelectors, MusicProjectStoreActions, ModalStateStoreSelectors } from 'src/app/root-store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { skipWhile, filter } from 'rxjs/operators';
import { MusicProject } from '../../models/publication/music/musicProject.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-password-validations',
  templateUrl: './password-validations.component.html',
  styleUrls: ['./password-validations.component.scss'],
})

export class PasswordValidationsComponent implements OnInit, OnDestroy {

  // form
  sendForm: FormGroup

  // error
  error$: Observable<string>
  errorCampaign$: Observable<string>

  // music
  musicProject: Observable<any>
  musicProjectSub: Subscription

  // store
  isLoading$: Observable<Boolean>
  isSuccess$: Observable<Boolean>

  constructor(
    private store$: Store<RootStoreState.State>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PasswordValidationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ValidationPasswordData
  ) { }

  ngOnInit() {

    // password form
    this.sendForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    })

    // to select the error for the music
    this.error$ = this.store$.select(
      MusicProjectStoreSelectors.selectMusicProjectError
    )

    // to select the publications music
    this.musicProject = this.store$.pipe(
      select(MusicProjectStoreSelectors.selectMusicProjectState),
      filter(val => !!val),
      skipWhile(val => val === null)
    )

    // close the modal after get the response
    this.musicProjectSub = this.musicProject.subscribe(data => {
      if (data.categorie == 'valid-password') this.closeModal()
    })

    // to select the loading request
    this.isLoading$ = this.store$.pipe(
      select(ModalStateStoreSelectors.selectIsLoading),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )


    this.isSuccess$ = this.store$.pipe(
      select(ModalStateStoreSelectors.selectSuccess),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )


  }

  get f() {
    return this.sendForm.controls
  }

  confirm() {

    if (this.sendForm.invalid) return null

    switch (this.data.type) {

      case 'deletePlaylist':
        this.store$.dispatch(new MusicProjectStoreActions.DeletePlaylist(this.data.playlistID, this.f.password.value))
        break
      case 'deleteMusic':
        this.store$.dispatch(new MusicProjectStoreActions.DeleteMusic(this.data.musicProjectId, this.data.musicID, this.f.password.value))
        break
      case 'deleteMusicProject':
        this.store$.dispatch(new MusicProjectStoreActions.deleteMusicProject(this.data.musicProjectId, this.f.password.value))
        break
      case 'changeDateMusicProject':
        const updateDateMusic = new MusicProject(this.data.dateChanged, null, null, null, null, this.data.musicProjectId)
        this.store$.dispatch(new MusicProjectStoreActions.UpdateMusicProject(updateDateMusic, this.f.password.value))
        break
    }

  }


  closeModal() {
    // to close the modal
    this.dialogRef.close()
  }

  ngOnDestroy(): void {
    // unsubscribe all the var
    if (this.musicProjectSub) this.musicProjectSub.unsubscribe()
  }

}

interface ValidationPasswordData {
  type: string
  musicProjectId: string
  playlistID: string
  musicID: string
  dateChanged: string
  campaignID: string
  pictureUrl: string
}
