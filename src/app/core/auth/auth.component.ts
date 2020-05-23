import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as AuthActions from './store/auth.actions';
import * as fromRoot from '../../store/app.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    const { username, password } = form.value;
    this.store.dispatch(AuthActions.startAuthentication({ username, password }))
  }
}
