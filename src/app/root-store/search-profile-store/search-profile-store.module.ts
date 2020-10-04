import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { SearchFeatureStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('searchProfile', featureReducer ),
    EffectsModule.forFeature([SearchFeatureStoreEffects])
  ],
  providers: [
    SearchFeatureStoreEffects
  ]
})
export class SearchProfileStoreModule { }
