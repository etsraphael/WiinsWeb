import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { FeedPublicationByIdStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('feed-publication-by-id', featureReducer),
    EffectsModule.forFeature([FeedPublicationByIdStoreEffects])
  ],
  providers: [
    FeedPublicationByIdStoreEffects
  ]
})
export class FeedPublicationByIdStoreModule { }
