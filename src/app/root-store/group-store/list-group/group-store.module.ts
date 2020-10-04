import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureReducerGroup } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('group', featureReducerGroup),
    EffectsModule.forFeature([GroupEffects])
  ],
  providers: [
    GroupEffects
  ]
})
export class GroupStoreModule { }
