import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {User} from "../../../shared/models/user";
import * as fromRoot from '../../../store/app.state';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private router: Router) {}

  @Effect()
  startAuthentication = this.actions$.pipe(
    ofType(AuthActions.START_AUTHENTICATION),
    switchMap((props: { user: User, redirect: boolean }) => {
      // Faking HTTP
      const user = new User(
        '1',
        'Eduardo',
        'Bearer',
        '123',
        new Date().getTime() + 3600,
    );

      return of(AuthActions.authenticationSuccess({ user, redirect: true }))
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    tap((props: { user: User, redirect: boolean }) => {
      if (props.redirect) {
        this.router.navigate(['/home']);
      }
    })
  );
}
