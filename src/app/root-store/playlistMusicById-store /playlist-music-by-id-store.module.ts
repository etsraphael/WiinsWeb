import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlaylistStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('playlistMusicById', featureReducer),
    EffectsModule.forFeature([PlaylistStoreEffects])
  ],
  providers: [
    PlaylistStoreEffects
  ]
})
export class PlaylistMusicByIdStoreModule { }
