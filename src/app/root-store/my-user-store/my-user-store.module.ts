import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MyUserEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('myUser', featureReducer),
    EffectsModule.forFeature([MyUserEffects])
  ],
  providers: [
    MyUserEffects
  ]
})
export class MyUserStoreModule { }
