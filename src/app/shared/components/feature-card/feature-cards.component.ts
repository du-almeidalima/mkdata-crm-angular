import {Component, Input, OnInit} from '@angular/core';

export interface FeatureCard {
  subTitle: string;
  imgUrl: string;
  actionLink?: string;
}

@Component({
  selector: 'app-feature-cards',
  template: `
    <div class="row">
      <div *ngFor="let feature of features" class="col-10 offset-1 col-sm-8 offset-sm-2 col-md-4 offset-md-0  mt-3">
        <mat-card class="app-feature-card"
          [ngClass]="feature?.actionLink ? 'pointer' : ''"
          [routerLink]="feature.actionLink"
        >
          <img mat-card-image class="app-feature-img-card" [src]="feature.imgUrl" [alt]="feature.subTitle">
          <mat-card-content class="mt-3">
            <h5 class="text-center">{{feature.subTitle}}</h5>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./feature-cards.component.scss']
})
export class FeatureCardsComponent implements OnInit {

  @Input()
  public features: FeatureCard[];

  constructor() { }

  ngOnInit(): void {}

}
