import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import { HomeComponent } from './components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";

const CORE_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
]
/**
 * Esse module vai ter as principais funcionalidades do nosso App que são necessárias para ele funcionar
 */
@NgModule({
  declarations: [ HomeComponent ],
  exports: [

  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild( CORE_ROUTES )
  ]
})
export class CoreModule {}
