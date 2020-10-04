import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducerPage } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayerMusicEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('playerMusic', featureReducerPage),
    EffectsModule.forFeature([PlayerMusicEffects])
  ],
  providers: [
    PlayerMusicEffects
  ]
})
export class PlayerMusicStoreModule { }
