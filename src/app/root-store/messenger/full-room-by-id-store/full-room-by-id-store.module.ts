import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { FullRoomByIdStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('fullRoomById', Reducer),
    EffectsModule.forFeature([FullRoomByIdStoreEffects])
  ],
  providers: [
    FullRoomByIdStoreEffects
  ]
})
export class FullRoomByIdStoreModule { }
