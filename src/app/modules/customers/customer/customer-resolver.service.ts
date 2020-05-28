import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromCustomers from '../store/index';
import * as CustomerActions from './store/customer.actions';

/* Essa classe assegura que a rota que a carrega esteja com o cliente carregado no estado */
@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<void>{

  constructor(private store: Store<fromCustomers.CustomersState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.store.dispatch(CustomerActions.fetchCustomer({ payload: route.params.id }));
  }
}
