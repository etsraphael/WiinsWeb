import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { FeedPublicationStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('feedPublication', featureReducer),
    EffectsModule.forFeature([FeedPublicationStoreEffects])
  ],
  providers: [FeedPublicationStoreEffects]
})
export class FeedPublicationStoreModule { }
