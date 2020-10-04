import { ProfileFeatureEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureReducerProfile, featureReducerProfilePage } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('profileFeature', featureReducerProfile),
    StoreModule.forFeature('profilePageFeature', featureReducerProfilePage),
    EffectsModule.forFeature([ProfileFeatureEffects])
  ],
  providers: [
    ProfileFeatureEffects
  ]
})
export class ProfileFeatureStoreModule { }
