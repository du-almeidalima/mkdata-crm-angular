import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {FeatureCard} from '../../../shared/components/feature-card/feature-cards.component';
import * as fromRoot from '../../../store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public userName: string;
  public readonly features: FeatureCard[] = [
    { subTitle: 'Cadastrar Cliente', imgUrl: 'assets/img/cliente.png', actionLink: '/clientes/cliente' },
    { subTitle: 'Cadastrar Grupo de Clientes', imgUrl: 'assets/img/grupo-clientes.png', actionLink: '/clientes/grupo' },
    { subTitle: 'Consultar Clientes', imgUrl: 'assets/img/pesquisar-cliente.png', actionLink: '/clientes/consulta' }
  ];

  private storeSub: Subscription;

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
  this.storeSub = this.store.select('auth')
    .pipe( map(authState => authState.user.name) )
    .subscribe(name => {
      this.userName = name;
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
