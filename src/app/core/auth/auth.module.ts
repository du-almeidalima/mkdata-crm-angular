import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

import {AuthComponent} from "./auth.component";
import {AuthEffects} from "./store/auth.effects";
import * as fromAuth from './store/auth.reducer';

const AUTH_ROUTES: Routes = [
  { path: 'login', component: AuthComponent }
];

@NgModule({
  declarations: [ AuthComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(AUTH_ROUTES),
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([ AuthEffects ]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AuthModule { }
