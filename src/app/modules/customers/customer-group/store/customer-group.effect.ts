import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";

import {CustomerGroupsResponse} from "../../../../shared/models/api/customer-groups-response";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import {CustomerGroupResponse} from "../../../../shared/models/api/customer-group-response";
import {environment as env} from "../../../../../environments/environment";
import * as fromCustomer from '../../store';
import * as CustomerGroupActions from './customer-group.actions';

@Injectable()
export class CustomerGroupEffect {

  private readonly CUSTOMER_GROUP_URL = env.baseUrl + env.customerGroups;

  constructor(
    private actions$: Actions,
    private store: Store<fromCustomer.State>,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect()
  fetchCustomerGroups = this.actions$.pipe(
    ofType(CustomerGroupActions.fetchCustomerGroups),
    switchMap(() => {
      return this.http.get<CustomerGroupsResponse>(this.CUSTOMER_GROUP_URL)
        .pipe(
          map(resp => {
            return this.handleCustomerGroupsGetSuccess(resp);
          }),
          catchError(errResp => {
            return this.handleCustomerGroupError(errResp);
          })
        )
    })
  );

  @Effect()
  fetchCustomerGroup = this.actions$.pipe(
    ofType(CustomerGroupActions.fetchCustomerGroup),
    switchMap((props) => {
      return this.http.get<CustomerGroupResponse>(`${this.CUSTOMER_GROUP_URL}/${props.payload}`)
        .pipe(
          map(resp => {
            return this.handleCustomerGroupGetSuccess(resp);
          }),
          catchError(errResp => {
            return this.handleCustomerGroupError(errResp);
          })
        )
    })
  );

  @Effect()
  createCustomerGroup = this.actions$.pipe(
    ofType(CustomerGroupActions.createCustomerGroup),
    switchMap(props  => {
      return this.http.post<CustomerGroupResponse>( this.CUSTOMER_GROUP_URL, props.payload )
        .pipe(
          map(resp => {
            return this.handleCustomerGroupPostSuccess(resp);
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerGroupError(errResp);
          })
        )
    })
  )

  @Effect({ dispatch: false })
  setCustomer = this.actions$.pipe(
    ofType(CustomerGroupActions.setCustomerGroup),
    tap((props) => {
      this.router.navigate(['/clientes','grupo', props.payload.id])
    })
  );

  // Handlers
  handleCustomerGroupPostSuccess(customerGroupResp: CustomerGroupResponse) {
    return CustomerGroupActions.fetchCustomerGroup({ payload: customerGroupResp.id })
  }

  handleCustomerGroupGetSuccess(customerGroupResp: CustomerGroupResponse) {
    const customerGroup: CustomerGroup = customerGroupResp as CustomerGroup;
    return CustomerGroupActions.setCustomerGroup({ payload: customerGroup })
  }

  handleCustomerGroupsGetSuccess(customerGroupsResp: CustomerGroupsResponse) {
    const customerGroups: CustomerGroup[] = customerGroupsResp._embedded.customerGroups;
    return CustomerGroupActions.setCustomerGroups({ payload: customerGroups })
  }

  handleCustomerGroupError(errResp: any) {
    return of(CustomerGroupActions.customerGroupError( { payload: errResp.message }))
  }
}
