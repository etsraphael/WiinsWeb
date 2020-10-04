import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducerPage } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { PageFeatureEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('pageFeature', featureReducerPage),
    EffectsModule.forFeature([PageFeatureEffects])
  ],
  providers: [
    PageFeatureEffects
  ]
})
export class PageFeatureStoreModule { }
