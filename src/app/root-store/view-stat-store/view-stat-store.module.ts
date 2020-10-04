import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerPageViewStat } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { ViewStatEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('viewStat', ReducerPageViewStat),
    EffectsModule.forFeature([ViewStatEffects])
  ],
  providers: [
    ViewStatEffects
  ]
})
export class ViewStatStoreModule { }
