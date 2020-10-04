import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducerPage } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReportEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('report', featureReducerPage),
    EffectsModule.forFeature([ReportEffects])
  ],
  providers: [
    ReportEffects
  ]
})
export class ReportStoreModule { }
