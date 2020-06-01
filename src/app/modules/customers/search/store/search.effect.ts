import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {forkJoin, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';

import {Severity} from '../../../../shared/models/enum/severity';
import {ItemType} from '../../../../shared/models/enum/item-type';
import {CustomersResponse} from '../../../../shared/models/api/customers-response';
import {CustomerGroupsResponse} from '../../../../shared/models/api/customer-groups-response';
import {SearchResult} from '../../../../shared/models/search-result';
import {environment as env} from '../../../../../environments/environment';
import * as CustomerCommonActions from '../../store/common.actions';
import * as SearchActions from './search.actions';
import * as fromCustomers from '../../store/index';

@Injectable()
export class SearchEffect {

  private readonly CUSTOMER_URL = env.baseUrl + env.customers;
  private readonly CUSTOMER_GROUP_URL = env.baseUrl + env.customerGroups;

  constructor(
    private actions$: Actions,
    private store: Store<fromCustomers.State>,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect()
  startSearch = this.actions$.pipe(
    ofType(SearchActions.startSearch),
    switchMap(props => {
      const params = new HttpParams().set('name', props.payload.term).set('status', `${props.payload.status}`);

      const customersResult = this.http
        .get<CustomersResponse>(
          `${this.CUSTOMER_URL}/search/findAnyByNameAndStatus`,
          {params}
        );
      const customerGroupsResult = this.http
        .get<CustomerGroupsResponse>(
          `${this.CUSTOMER_GROUP_URL}/search/findAnyByNameAndStatus`,
          {params}
          );

      return forkJoin([customersResult, customerGroupsResult])
      .pipe(
        map(resp => {
          return this.handleSearchSuccess({customersResp: resp[0], customerGroupsResp: resp[1]});
        }),
        catchError( errResp => {
          return this.handleSearchError(errResp);
        })
      );
    })
  );

  @Effect()
  refreshSearchResult = this.actions$.pipe(
    ofType(SearchActions.refreshSearchResults),
    withLatestFrom( this.store.pipe( select(fromCustomers.getSearchState) )),
    switchMap(([actionData, searchState]) => {
      return of( SearchActions.startSearch({ payload: searchState.lastSearch }));
    })
  );

  // Handlers
  handleSearchSuccess(resp: {customersResp: CustomersResponse, customerGroupsResp: CustomerGroupsResponse}) {
    const customers = resp.customersResp._embedded.customers.map( c => {
      c.itemType = ItemType.CUSTOMER;
      return c;
    });
    const customerGroups = resp.customerGroupsResp._embedded.customerGroups.map( cg => {
      cg.itemType = ItemType.CUSTOMER_GROUP;
      return cg;
    });

    const searchResult: SearchResult = {
      customers,
      customerGroups
    };

    return SearchActions.setSearchResult({ payload: searchResult});
  }

  handleSearchError(errResp: HttpErrorResponse) {
    let message;

    switch (errResp.status) {
      case 400:
        message = 'O termo digitado não é válido.';
        break;
      case 404:
        message = 'Nenhuma Resposta foi encontrada para essa pesquisa.';
        break;
      case 500:
        message = 'Houve um erro no servidor, por favor tente mais tarde.';
        break;
      default:
        message = 'Houve um erro durante sua requisição, por favor, reporte essa mensagem.';
    }
    return of(CustomerCommonActions.setMessage( { payload: {severity: Severity.DANGER, content: message} }));
  }
}
