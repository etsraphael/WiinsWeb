import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { FriendsRequestFeatureStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('friendsRequestFeature', featureReducer),
    EffectsModule.forFeature([FriendsRequestFeatureStoreEffects])
  ],
  providers: [
    FriendsRequestFeatureStoreEffects
  ]
})
export class FriendsRequestFeatureStoreModule { }
