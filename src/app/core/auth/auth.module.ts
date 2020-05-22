import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

const AUTH_ROUTES: Routes = [
  { path: 'login', component: AuthComponent }
];

@NgModule({
  declarations: [ AuthComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(AUTH_ROUTES)
  ]
})
export class AuthModule { }
