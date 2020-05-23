import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from "./auth/auth.module";

/**
 * Esse module vai ter as principais funcionalidades do nosso App que são necessárias para ele funcionar
 */
@NgModule({
  declarations: [],
  exports: [

  ],
  imports: [
    CommonModule,
    AuthModule
  ]
})
export class CoreModule {}
