import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromRoot from '../../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromRoot.AppState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Verifica se existe um objeto User no AuthState e caso negativo retorna a rota a ser redirecionada
    return this.store.select('auth')
      .pipe(
        take(1),
        map(authState => {
          return !!authState.user ? true : this.router.parseUrl('/login');
        })
      );
  }

}
