import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CustomerEffect} from "../customer/store/customer.effect";
import {CustomerGroupEffect} from "../customer-group/store/customer-group.effect";
import * as fromCustomer from "../customer/store/customer.reducer";
import * as fromCustomerGroup from "../customer-group/store/customer-group.reducer";

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

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  state => state.customer.current
)

export const getCustomerGroups = createSelector(
  getCustomerFeatureState,
  state => state.customerGroup.customerGroups
)
