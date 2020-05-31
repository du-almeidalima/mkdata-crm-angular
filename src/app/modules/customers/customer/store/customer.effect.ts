import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {forkJoin, of} from "rxjs";
import {catchError, exhaustMap, map, switchMap, tap} from "rxjs/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import {CustomersMapper} from "../../../../shared/utils/customers-mapper";
import {Severity} from "../../../../shared/models/enum/severity";
import {Customer} from "../../../../shared/models/customer";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import {CustomerResponse} from "../../../../shared/models/api/customer-response";
import {CustomerGroupResponse} from "../../../../shared/models/api/customer-group-response";
import {environment as env} from "../../../../../environments/environment";
import * as fromCustomers from '../../store/index';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffect {

  private readonly CUSTOMER_URL = env.baseUrl + env.customers;

  constructor(
    private actions$: Actions,
    private store: Store<fromCustomers.State>,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect()
  fetchCustomer = this.actions$.pipe(
    ofType(CustomerActions.fetchCustomer),
    exhaustMap(props => {

      const customerResponse = this.http.get<CustomerResponse>(`${this.CUSTOMER_URL}/${props.payload}`);
      const customerGroupResponse = this.http
        .get<CustomerGroupResponse>(`${this.CUSTOMER_URL}/${props.payload}/customerGroup`)
        .pipe( catchError(() => of(null)))

      const resp = { customer: customerResponse, customerGroup: customerGroupResponse };
      return forkJoin(resp)
      .pipe(
        map(resp => {
          return this.handleCustomerGetSuccess(resp, props.redirect);
        }),
        catchError( errResp => {
          return this.handleCustomerError(errResp);
        })
      )
    })
  );

  @Effect()
  createCustomer = this.actions$.pipe(
    ofType(CustomerActions.createCustomer),
    switchMap(props  => {
      const customerPost = CustomersMapper.mapCustomerToCustomerPost(props.payload);
      return this.http.post<CustomerResponse>( this.CUSTOMER_URL, customerPost )
        .pipe(
          map(resp => {
            return this.handleCustomerPostSuccess(resp);
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerError(errResp);
          })
        )
    })
  );

  @Effect({dispatch: false})
  setCustomer = this.actions$.pipe(
    ofType(CustomerActions.setCustomer),
    tap(props => {
      if (props.redirect) {
        this.router.navigate(['/clientes','cliente', props.payload.id])
      }
    })
  );

  // Handlers
  handleCustomerPostSuccess(customerResp: CustomerResponse) {
    return CustomerActions.fetchCustomer({ payload: customerResp.id, redirect: true });
  }

  handleCustomerGetSuccess(resp:{ customer: CustomerResponse, customerGroup: CustomerGroupResponse }, redirect: boolean) {
    const customer: Customer = {
      ...resp.customer,
      customerGroup: (resp.customerGroup as CustomerGroup),
      registerDate: +resp.customer.registerDate
    }
    return CustomerActions.setCustomer({ payload: customer, redirect });
  }

  handleCustomerError(errResp: HttpErrorResponse) {
    let message;

    switch (errResp.status) {
      case 400:
        message = 'Esse número de cliente não é válido.';
        break;
      case 404:
        message = 'Esse cliente não existe.';
        break;
      case 500:
        message = 'Houve um erro no servidor, por favor tente mais tarde.';
        break;
      default:
        message = 'Houve um erro durante sua requisição, por favor, reporte essa mensagem.'
    }
    return of(CustomerActions.customerError( { payload: {severity: Severity.DANGER, content: message} }))
  }
}
