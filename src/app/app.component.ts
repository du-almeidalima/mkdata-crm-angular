import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from './shared/models/user';
import {map} from 'rxjs/operators';
import * as fromRoot from './store/app.state';
import * as AuthActions from './core/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public user: Observable<User>;

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    //  Ações iniciar a aplicação
    this.user = this.store.select('auth').pipe( map(authState => authState.user) );
    this.store.dispatch(AuthActions.autoLogin());
  }
}
