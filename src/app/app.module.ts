import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ActionReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeLogger} from "ngrx-store-logger";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment as env} from '../environments/environment';
import {CoreModule} from "./core/core.module";

// For Console Logging the State
function logger(reducer: ActionReducer<any>): any {
  return storeLogger({
    timestamp: false,
    duration: false
  })(reducer);
}

const metaReducers = env.production ? [] : [ logger ];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: env.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
