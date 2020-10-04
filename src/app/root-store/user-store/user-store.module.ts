import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('User', featureReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserEffects
  ]
})
export class UserStoreModule { }
