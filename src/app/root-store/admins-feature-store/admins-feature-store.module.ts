import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminsFeatureEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('adminsFeature', featureReducer),
    EffectsModule.forFeature([AdminsFeatureEffects])
  ],
  providers: [
    AdminsFeatureEffects
  ]
})
export class AdminsFeatureStoreModule { }
