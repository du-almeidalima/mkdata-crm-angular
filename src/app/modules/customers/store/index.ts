import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CustomerEffect} from "../customer/store/customer.effect";
import {CustomerGroupEffect} from "../customer-group/store/customer-group.effect";
import * as fromRoot from '../../../store/app.state';
import * as fromCustomer from "../customer/store/customer.reducer";
import * as fromCustomerGroup from "../customer-group/store/customer-group.reducer";

// Combinando CustomersState com o AppState, por conta de ser Lazy Loaded
export interface State extends fromRoot.AppState{
  customers: CustomersState
}

// Combinando os reducers e states dos subcomponentes
export interface CustomersState {
  customer: fromCustomer.CustomerState
  customerGroup: fromCustomerGroup.CustomerGroupState
}

export const customersReducers = {
  customer: fromCustomer.customerReducer,
  customerGroup: fromCustomerGroup.customerGroupReducer
}

export const customersEffects = [
  CustomerEffect,
  CustomerGroupEffect
]

// Selectors
export const getCustomerFeatureState = createFeatureSelector<CustomersState>('customers')

export const getCustomerState = createSelector(
  getCustomerFeatureState,
  state => state.customer
)

export const getCustomerGroups = createSelector(
  getCustomerFeatureState,
  state => state.customerGroup.customerGroups
)
