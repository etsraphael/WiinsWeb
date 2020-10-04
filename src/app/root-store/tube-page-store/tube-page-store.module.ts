import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { TubePageStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('TubePage', featureReducer),
    EffectsModule.forFeature([TubePageStoreEffects])
  ],
  providers: [TubePageStoreEffects]
})
export class TubePageStoreModule { }
