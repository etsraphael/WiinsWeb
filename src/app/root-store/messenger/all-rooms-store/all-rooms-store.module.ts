import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { AllRoomsEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('allRooms', Reducer),
    EffectsModule.forFeature([AllRoomsEffects])
  ],
  providers: [
    AllRoomsEffects
  ]
})
export class AllRoomsStoreModule { }
