import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardsComponent } from './components/feature-card/feature-cards.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [FeatureCardsComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FeatureCardsComponent
  ]
})
export class SharedModule { }
