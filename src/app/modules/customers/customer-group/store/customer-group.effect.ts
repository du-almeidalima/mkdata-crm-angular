import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";

import {Severity} from "../../../../shared/models/enum/severity";
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

  @Effect( { dispatch: false } )
  createCustomerGroup = this.actions$.pipe(
    ofType(CustomerGroupActions.createCustomerGroup),
    switchMap(props  => {
      return this.http.post<CustomerGroupResponse>( this.CUSTOMER_GROUP_URL, props.payload )
        .pipe(
          map(resp => {
            return this.handleCustomerGroupPostPutSuccess(resp);
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerGroupError(errResp);
          })
        )
    })
  )

  @Effect( { dispatch: false } )
  updateCustomerGroup = this.actions$.pipe(
    ofType(CustomerGroupActions.updateCustomerGroup),
    switchMap(props  => {
      return this.http.put<CustomerGroupResponse>( `${this.CUSTOMER_GROUP_URL}/${props.payload.id}`, props.payload )
        .pipe(
          map(resp => {
            return this.handleCustomerGroupPostPutSuccess(resp);
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerGroupError(errResp);
          })
        )
    })
  )

  // Handlers
  handleCustomerGroupPostPutSuccess(customerGroupResp: CustomerGroupResponse) {
    this.router.navigate(['/clientes','grupo', customerGroupResp.id])
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
    let message;

    switch (errResp.status) {
      case 400:
        message = 'Esse número de Grupo de Clientes não é válido.';
        break;
      case 404:
        message = 'Esse Grupo de Clientes não existe.';
        break;
      case 500:
        message = 'Houve um erro no servidor, por favor tente mais tarde.';
        break;
      default:
        message = 'Houve um erro durante sua requisição, por favor, reporte essa mensagem.'
    }
    return of(CustomerGroupActions.customerGroupError( { payload: {severity: Severity.DANGER, content: message} }));
  }
}
