import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {Actions, ofType} from "@ngrx/effects";
import {Customer} from "../../../shared/models/customer";
import * as fromCustomers from '../store/index';
import * as CustomerActions from './store/customer.actions';

/* Essa classe assegura que a rota que a carrega esteja com o cliente carregado no estado */
@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<Customer>{

  constructor(
    private store: Store<fromCustomers.CustomersState>,
    private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Customer> | Promise<Customer> | Customer {

    const id = route.params?.id;
    this.store.dispatch(CustomerActions.fetchCustomer({ payload: id } ));

    return this.actions$.pipe(
      take(1),
      ofType(CustomerActions.setCustomer),
      map(props => props.payload)
    );
  }
}
