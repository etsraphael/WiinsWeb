import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoomByIdStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('roomById', Reducer),
    EffectsModule.forFeature([RoomByIdStoreEffects])
  ],
  providers: [
    RoomByIdStoreEffects
  ]
})
export class RoomByIdStoreModule { }
