import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";

import {CustomerGroup} from "../../../shared/models/customer-group";
import * as CustomerGroupActions from './store/customer-group.actions';
import * as fromCustomers from "../store";

/* Essa classe assegura que sempre que uma rota for carregada a tera o CustomerGroup passado no :id carregado nela */
@Injectable({
  providedIn: 'root'
})
export class CustomerGroupResolver implements Resolve<CustomerGroup>{

  constructor(
    private store: Store<fromCustomers.CustomersState>,
    private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<CustomerGroup> | Promise<CustomerGroup> | CustomerGroup {

    const id = route.params?.id;
    this.store.dispatch(CustomerGroupActions.fetchCustomerGroup({ payload: id }));

    return this.actions$.pipe(
      take(1),
      ofType(CustomerGroupActions.setCustomerGroup),
      map(props => props.payload)
    );
  }
}
