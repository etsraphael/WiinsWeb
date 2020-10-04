import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { ResponseFeatureStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ResponseComment', featureReducer),
    EffectsModule.forFeature([ResponseFeatureStoreEffects])
  ],
  providers: [
    ResponseFeatureStoreEffects
  ]
})
export class ResponseFeatureStoreModule { }
