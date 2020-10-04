import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { TubeFeedStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('TubeFeed', featureReducer),
    EffectsModule.forFeature([TubeFeedStoreEffects])
  ],
  providers: [TubeFeedStoreEffects]
})
export class TubeFeedStoreModule { }
