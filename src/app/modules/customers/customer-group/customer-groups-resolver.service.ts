import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromCustomers from '../store/index';
import * as CustomerGroupActions from './store/customer-group.actions';

/* Essa classe assegura que sempre que uma rota for carregada a property "customerGroups" do State "CustomerGroup"
 * estará carregada;
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerGroupsResolver implements Resolve<void>{

  constructor(private store: Store<fromCustomers.CustomersState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.store.dispatch(CustomerGroupActions.fetchCustomerGroups());
  }
}
