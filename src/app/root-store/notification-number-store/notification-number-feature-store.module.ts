import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NotificationFeatureEffects } from './effects';
import { requestReducer, activityReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('NumberRequest', requestReducer),
    StoreModule.forFeature('NumberActivity', activityReducer),
    EffectsModule.forFeature([NotificationFeatureEffects])
  ],
  providers: [
    NotificationFeatureEffects
  ]
})
export class NotificationNumberStoreModule { }
