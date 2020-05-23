import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {switchMap, tap} from "rxjs/operators";
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

  private handleAuthenticationSuccess(): Observable<any> {
    const user = new User(
      '1',
      'Eduardo',
      'Bearer',
      '123',
      new Date().getTime() + 3600,
    );

    this.authService.setUserLocalStorage(user, new Date().getTime() + 3600);
    return of(AuthActions.authenticationSuccess({ user, redirect: true }));
  }
}
