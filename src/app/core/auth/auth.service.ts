import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {User} from "../../shared/models/user";
import {environment as env} from "../../../environments/environment";
import * as fromApp from '../../store/app.state';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor( private store: Store<fromApp.AppState> ) {}

  private setLogoutTimer(expirationDuration: number): void {
    console.log(`Session expires in: ${((expirationDuration / 1000) / 60).toFixed(0)} minutes`);

    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  private clearLogoutTimer(): void {
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  public setUserLocalStorage(user: User, expirationDuration: number): void {
    localStorage.setItem(env.userLSKey, JSON.stringify(user));
    this.setLogoutTimer(expirationDuration);
  }

  public removeUserLocalStorage(): void {
    localStorage.removeItem(env.userLSKey);
    this.clearLogoutTimer();
  }
}
