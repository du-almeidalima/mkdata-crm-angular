import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

const CORE_ROUTES: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},
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
    RouterModule.forChild(CORE_ROUTES),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgbDropdownModule
  ]
})
export class CoreModule {}
