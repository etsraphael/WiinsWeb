import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { MusicProjectStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('musicProject', featureReducer),
    EffectsModule.forFeature([MusicProjectStoreEffects])
  ],
  providers: [
    MusicProjectStoreEffects
  ]
})
export class MusicProjectStoreModule { }
