import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {catchError, exhaustMap, map, switchMap, tap} from "rxjs/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import {CustomersMapper} from "../../../../shared/utils/customers-mapper";
import {Severity} from "../../../../shared/models/enum/severity";
import {Customer} from "../../../../shared/models/customer";
import {CustomerResponse} from "../../../../shared/models/api/customer-response";
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
      console.log(props)
      return this.http.get<CustomerResponse>(
        `${this.CUSTOMER_URL}/${props.payload}`
      ).pipe(
        map(resp => {
          return this.handleCustomerSuccess(resp);
        }),
        catchError( errResp => {
          return this.handleCustomerError(errResp);
        })
      )
    })
  );

  @Effect({dispatch: false})
  setCustomer = this.actions$.pipe(
    ofType(CustomerActions.CustomerActionTypes.SetCustomer),
    tap((props: { payload: Customer }) => {
      this.router.navigate(['/clientes','cliente', props.payload.id])
    })
  );

  @Effect()
  createCustomer = this.actions$.pipe(
    ofType(CustomerActions.createCustomer),
    switchMap(props  => {
      const customerPost = CustomersMapper.mapCustomerToCustomerPost(props.payload);
      return this.http.post<CustomerResponse>(
        this.CUSTOMER_URL,
        customerPost
      ).pipe(
        map(resp => {
          return this.handleCustomerSuccess(resp);
        }),
        catchError((errResp: HttpErrorResponse) => {
          return this.handleCustomerError(errResp);
        })
      )
    })
  )

  // Handlers
  handleCustomerSuccess(customerResp: CustomerResponse) {
    // Como CustomerResponse estende o Customer, vou apenas fazer um cast down
    return CustomerActions.setCustomer({ payload: (customerResp as Customer) });
  }

  handleCustomerError(errResp: HttpErrorResponse) {
    let message;

    switch (errResp.status) {
      case 404:
        message = 'Esse cliente não existe';
        break;
      case 500:
        message = 'Houve um erro no servidor, por favor tente mais tarde';
        break;
      default:
        message = 'Houve um erro durante sua requisição, por favor, reporte essa mensagem'
    }
    return of(CustomerActions.customerError( { payload: {severity: Severity.DANGER, content: message} }))
  }
}
