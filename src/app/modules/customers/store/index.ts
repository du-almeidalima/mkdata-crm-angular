import {CustomerEffect} from "../customer/store/customer.effect";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CustomerState} from "../customer/store/customer.reducer";
import * as fromRoot from '../../../store/app.state';
import * as fromCustomer from '../customer/store/customer.reducer';

// Este Arquivo é a junção dos Reducers e Estado de todos os componentes deste modulo
export interface AppState extends fromRoot.AppState{
  customer: CustomerState
}

// Combinando os reducers e states dos subcomponentes
export interface CustomersState {
  customer: fromCustomer.CustomerState
}

export const customersReducers = {
  customer: fromCustomer.customerReducer
}

export const customersEffects = [
  CustomerEffect
]

// Selectors
export const getCustomerFeatureState = createFeatureSelector<CustomersState>('customers')

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  state => state.customer.current
)
