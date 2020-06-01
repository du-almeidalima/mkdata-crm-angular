import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {forkJoin, of} from "rxjs";
import {catchError, exhaustMap, map, switchMap} from "rxjs/operators";
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
import * as CustomerCommonActions from '../../store/common.actions';
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
          return this.handleCustomerGetSuccess(resp);
        }),
        catchError( errResp => {
          return this.handleCustomerError(errResp);
        })
      )
    })
  );

  @Effect({ dispatch: false })
  createCustomer = this.actions$.pipe(
    ofType(CustomerActions.createCustomer),
    switchMap(props  => {
      const customerPost = CustomersMapper.mapCustomerToCustomerPost(props.payload);
      return this.http.post<CustomerResponse>( this.CUSTOMER_URL, customerPost )
        .pipe(
          map(resp => {
            return this.handleCustomerPostPutSuccess(resp);
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerError(errResp);
          })
        )
    })
  );

  @Effect( { dispatch: false } )
  updateCustomer = this.actions$.pipe(
    ofType(CustomerActions.updateCustomer),
    switchMap(props  => {
      const customerPost = CustomersMapper.mapCustomerToCustomerPost(props.payload);
      return this.http.patch<CustomerResponse>( `${this.CUSTOMER_URL}/${props.payload.id}`, customerPost )
        .pipe(
          map(resp => {
            return this.handleCustomerPostPutSuccess(resp);
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerError(errResp);
          })
        )
    })
  );

  @Effect()
  deleteCustomer = this.actions$.pipe(
    ofType(CustomerActions.deleteCustomer),
    switchMap(props  => {
      return this.http.delete<CustomerGroup>( `${this.CUSTOMER_URL}/${props.payload}`)
        .pipe(
          map(() => {
            return this.handleCustomerGroupDeleteSuccess();
          }),
          catchError((errResp: HttpErrorResponse) => {
            return this.handleCustomerError(errResp);
          })
        )
    })
  );

  // Handlers
  handleCustomerPostPutSuccess(customerResp: CustomerResponse) {
    this.router.navigate(['/clientes','cliente', customerResp.id]);
  }

  handleCustomerGroupDeleteSuccess() {
    const message = 'Cliente excluído com sucesso';
    this.router.navigate(['/clientes']);

    return CustomerCommonActions.setMessage( { payload: {severity: Severity.SUCCESS, content: message} });
  }

  handleCustomerGetSuccess(resp:{ customer: CustomerResponse, customerGroup: CustomerGroupResponse }) {
    const customer: Customer = {
      ...resp.customer,
      customerGroup: (resp.customerGroup as CustomerGroup),
      registerDate: +resp.customer.registerDate
    }
    return CustomerActions.setCustomer({ payload: customer});
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
    return of(CustomerCommonActions.setMessage( { payload: {severity: Severity.DANGER, content: message} }))
  }
}
