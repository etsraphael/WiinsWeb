import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { MusicByIdStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('musicById', featureReducer),
    EffectsModule.forFeature([MusicByIdStoreEffects])
  ],
  providers: [
    MusicByIdStoreEffects
  ]
})
export class MusicByIdStoreModule { }
