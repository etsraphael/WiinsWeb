import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ModalStateEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ModalState', featureReducer),
    EffectsModule.forFeature([ModalStateEffects])
  ],
  providers: [ModalStateEffects]
})
export class ModalStateStoreModule { }
