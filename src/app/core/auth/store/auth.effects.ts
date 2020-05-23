import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User} from "../../../shared/models/user";
import {AuthService} from "../auth.service";
import * as fromRoot from '../../../store/app.state';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private router: Router,
    private authService: AuthService) {}

  @Effect()
  startAuthentication = this.actions$.pipe(
    ofType(AuthActions.AuthActionsTypes.StartAuthentication),
    switchMap((props: { user: User, redirect: boolean }) => {
      // Faking HTTP
      return this.handleAuthenticationSuccess();
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AuthActionsTypes.AuthenticationSuccess),
    tap((props: { user: User, redirect: boolean }) => {
      if (props.redirect) {
        this.router.navigate(['/home']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.AuthActionsTypes.Logout),
    tap(() => {
      this.authService.removeUserLocalStorage();
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AuthActionsTypes.AutoLogin),
    map(() => {
      const restoredUser = this.authService.getUserLocalStorage();
      if (restoredUser){
        const {name, username, id, tokenType, _token, _tokenExpirationDate} = restoredUser;
        const user = new User( name, id, username, tokenType, _token, new Date(_tokenExpirationDate));

        // Checking if token is still valid (check User class)
        if (user.token){
          const expirationDuration = (new Date(_tokenExpirationDate).getTime() - new Date().getTime());
          // Starting Session countdown
          this.authService.setUserLocalStorage(user, expirationDuration);

          return AuthActions.authenticationSuccess({ user: user, redirect: false });
        } else {
          console.info(`User token has expired.`);
          return { type: 'NULL' }
        }
      } else {
        console.info(`Couldn't find any user to auto login.`);
        return { type: 'NULL' }
      }
    })
  );

  // Handlers
  private handleAuthenticationSuccess(): Observable<any> {
    const user = new User(
      'Eduardo Lima',
      '1',
      'Eduardo',
      'Bearer',
      '123',
      new Date(new Date().getTime() + 3600000),
    );

    this.authService.setUserLocalStorage(user, new Date().getTime() + 3600000);
    return of(AuthActions.authenticationSuccess({ user, redirect: true }));
  }
}
