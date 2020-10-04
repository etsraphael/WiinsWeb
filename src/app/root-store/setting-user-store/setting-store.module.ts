import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PrivacySettingEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('PrivacySetting', featureReducer),
    EffectsModule.forFeature([PrivacySettingEffects])
  ],
  providers: [
    PrivacySettingEffects
  ]
})
export class SettingStoreModule { }
