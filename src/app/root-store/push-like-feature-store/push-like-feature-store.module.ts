import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { PushLikeFeatureEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('PushLikeFeature', featureReducer),
    EffectsModule.forFeature([PushLikeFeatureEffects])
  ],
  providers: [
    PushLikeFeatureEffects
  ]
})
export class PushLikeFeatureStoreModule { }
