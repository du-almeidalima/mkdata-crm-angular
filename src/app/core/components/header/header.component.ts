import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../store/app.state';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {}

  public onLogout(): void {
    this.store.dispatch(AuthActions.logout())
  }
}
