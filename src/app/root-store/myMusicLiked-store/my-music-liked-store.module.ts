import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { MyMusicLikedStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('myMusicLiked', featureReducer),
    EffectsModule.forFeature([MyMusicLikedStoreEffects])
  ],
  providers: [
    MyMusicLikedStoreEffects
  ]
})
export class MyMusicLikedStoreModule { }
