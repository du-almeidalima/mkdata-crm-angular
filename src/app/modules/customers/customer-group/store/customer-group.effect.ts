import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";

import {CustomerGroupsResponse} from "../../../../shared/models/api/customer-groups-response";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import {environment as env} from "../../../../../environments/environment";
import * as fromCustomer from '../../store';
import * as CustomerGroupActions from './customer-group.actions';

@Injectable()
export class CustomerGroupEffect {

  private readonly CUSTOMER_GROUP_URL = env.baseUrl + env.customerGroup;

  constructor(
    private actions$: Actions,
    private store: Store<fromCustomer.CustomersState>,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect()
  fetchCustomerGroups = this.actions$.pipe(
    ofType(CustomerGroupActions.CustomerGroupActionTypes.FetchCustomerGroups),
    switchMap(() => {
      return this.http.get<CustomerGroupsResponse>(this.CUSTOMER_GROUP_URL)
        .pipe(
          map(resp => {
            return this.handleCustomerGroupGetSuccess(resp);
          }),
          catchError(errResp => {
            return this.handleCustomerGroupGetFail(errResp);
          })
        )
    })
  );

  // Handlers
  handleCustomerGroupGetSuccess(customerGroupResp: CustomerGroupsResponse) {
    const customerGroups: CustomerGroup[] = customerGroupResp._embedded.customerGroups;
    return CustomerGroupActions.setCustomerGroups({ payload: customerGroups })
  }

  handleCustomerGroupGetFail(errResp: any) {
    return of(CustomerGroupActions.customerGroupError( { payload: errResp.message }))
  }
}
