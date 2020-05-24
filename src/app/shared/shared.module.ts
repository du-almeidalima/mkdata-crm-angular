import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardsComponent } from './components/feature-card/feature-cards.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [FeatureCardsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ],
  exports: [
    FeatureCardsComponent
  ]
})
export class SharedModule { }
