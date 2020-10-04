import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { CurrentRoomEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('currentRoom', Reducer),
    EffectsModule.forFeature([CurrentRoomEffects])
  ],
  providers: [
    CurrentRoomEffects
  ]
})
export class CurrentRoomStoreModule { }
