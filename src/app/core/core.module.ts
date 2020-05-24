import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "../shared/shared.module";
import {MatToolbarModule} from "@angular/material/toolbar";

const CORE_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
]
/**
 * Esse module vai ter as principais funcionalidades do nosso App que são necessárias para ele funcionar
 */
@NgModule({
  declarations: [ HomeComponent, HeaderComponent ],
  exports: [
    HeaderComponent

  ],
  imports: [
    CommonModule,
    AuthModule,
    SharedModule,
    RouterModule.forChild(CORE_ROUTES),
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    NgbDropdownModule
  ]
})
export class CoreModule {}
