import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationsEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('notification', featureReducer),
    EffectsModule.forFeature([NotificationsEffects])
  ],
  providers: [
    NotificationsEffects
  ]
})
export class NotificationsStoreModule { }
