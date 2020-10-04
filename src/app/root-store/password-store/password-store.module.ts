import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PasswordEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('Password', featureReducer),
    EffectsModule.forFeature([PasswordEffects])
  ],
  providers: [
    PasswordEffects
  ]
})
export class PasswordStoreModule { }
