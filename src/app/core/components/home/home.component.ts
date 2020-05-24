import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromRoot from '../../../store/app.state';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userName: Observable<string>
  public readonly features: {subTitle: string, imgUrl: string}[] = [
    { subTitle: 'Cadastrar Cliente', imgUrl: 'assets/img/cliente.png' },
    { subTitle: 'Cadastrar Grupo de Clientes', imgUrl: 'assets/img/cliente-grupo.png' },
    { subTitle: 'Consultar Clientes', imgUrl: 'assets/img/pesquisar-cliente.png' }
  ]
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
  this.userName = this.store.select('auth')
      .pipe( map(authState => authState.user.name) )
  }

}
