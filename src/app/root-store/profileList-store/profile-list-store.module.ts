import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileListStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ProfileList', featureReducer),
    EffectsModule.forFeature([ProfileListStoreEffects])
  ],
  providers: [ProfileListStoreEffects]
})
export class ProfileListStoreModule { }
