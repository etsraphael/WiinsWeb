import { FriendsFeatureStoreEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('friendsFeature', featureReducer),
    EffectsModule.forFeature([FriendsFeatureStoreEffects])
  ],
  providers: [
    FriendsFeatureStoreEffects
  ]
})
export class FriendsFeatureStoreModule { }
