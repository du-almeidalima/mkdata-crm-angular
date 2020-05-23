import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
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
    StoreModule.forFeature('auth', fromAuth.authReducer),
    RouterModule.forChild(AUTH_ROUTES)
  ]
})
export class AuthModule { }
