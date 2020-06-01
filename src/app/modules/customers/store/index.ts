import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CustomerEffect} from "../customer/store/customer.effect";
import {CustomerGroupEffect} from "../customer-group/store/customer-group.effect";
import * as fromRoot from '../../../store/app.state';
import * as fromCustomersCommon from "./common.reducer";
import * as fromCustomer from "../customer/store/customer.reducer";
import * as fromCustomerGroup from "../customer-group/store/customer-group.reducer";
import * as fromSearch from "../search/store/search.reducer";
import {SearchEffect} from "../search/store/search.effect";

// Combinando CustomersState com o AppState, por conta de ser Lazy Loaded
export interface State extends fromRoot.AppState{
  customers: CustomersState
}

// Combinando os reducers e states dos subcomponentes
export interface CustomersState {
  common: fromCustomersCommon.CustomersCommonState
  customer: fromCustomer.CustomerState;
  customerGroup: fromCustomerGroup.CustomerGroupState;
  search: fromSearch.SearchState
}

export const customersReducers = {
  common: fromCustomersCommon.customerReducer,
  customer: fromCustomer.customerReducer,
  customerGroup: fromCustomerGroup.customerGroupReducer,
  search: fromSearch.searchReducer
}

export const customersEffects = [
  CustomerEffect,
  CustomerGroupEffect,
  SearchEffect
]

// Selectors
export const getCustomerFeatureState = createFeatureSelector<CustomersState>('customers')

export const getCustomerState = createSelector(
  getCustomerFeatureState,
  state => state.customer
)

export const getCustomerGroupState = createSelector(
  getCustomerFeatureState,
  state => state.customerGroup
)

export const getFeatureRootState= createSelector(
  getCustomerFeatureState,
  state => state
)
