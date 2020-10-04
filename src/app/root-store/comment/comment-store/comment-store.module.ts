import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { CommentFeatureStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('Comment', featureReducer),
    EffectsModule.forFeature([CommentFeatureStoreEffects])
  ],
  providers: [
    CommentFeatureStoreEffects
  ]
})
export class CommentFeatureStoreModule { }
