import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import {Customer} from "../../../../shared/models/customer";
import {CustomerResponse} from "../../../../shared/models/api/customer-response";
import {environment as env} from "../../../../../environments/environment";
import * as fromCustomer from '../../store';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffect {
  private readonly CUSTOMER_URL = env.baseUrl + env.customers
  constructor(
    private actions$: Actions,
    private store: Store<fromCustomer.CustomersState>,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect({dispatch: false})
  fetchCustomer = this.actions$.pipe(
    ofType(CustomerActions.CustomerActionTypes.FetchCustomer),
    tap(test => {
      console.log(test)
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

      const { name, type, cpfCnpj, rgIe, registerDate, group, status, phones } = props.payload;
      const customer: Customer = {
        name,
        type,
        cpfCnpj,
        rgIe,
        status,
        registerDate: new Date(registerDate).getTime(),
        group,
        phones
      }

      return this.http.post<CustomerResponse>(
        this.CUSTOMER_URL,
        customer
      ).pipe(
        map(resp => {
          return this.handleCustomerPostSuccess(resp);
        }),
        catchError(errResp => {
          return this.handleCustomerPostError(errResp);
        })
      )
    })
  )

  // Handlers
  handleCustomerPostSuccess(customerResp: CustomerResponse) {
    // Como CustomerResponse estende o Customer, vou apenas fazer um cast down
    return CustomerActions.setCustomer({ payload: (customerResp as Customer) });
  }

  handleCustomerPostError(errResp: any) {
    return of(CustomerActions.customerError( { payload: errResp.message }))
  }
}
