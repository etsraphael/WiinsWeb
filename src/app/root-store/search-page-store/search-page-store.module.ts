import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { SearchPageStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('searchPage', featureReducer),
    EffectsModule.forFeature([SearchPageStoreEffects])
  ],
  providers: [
    SearchPageStoreEffects
  ]
})
export class SearchPageStoreModule { }
