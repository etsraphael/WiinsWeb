import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { TubeMenuStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('TubeMenu', featureReducer),
    EffectsModule.forFeature([TubeMenuStoreEffects])
  ],
  providers: [TubeMenuStoreEffects]
})
export class TubeMenuStoreModule { }
