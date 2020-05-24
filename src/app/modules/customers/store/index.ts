import * as fromCustomer from '../customer/store/customer.reducer';
import {CustomerEffect} from "../customer/store/customer.effect";

// Este Arquivo é a junção dos Reducers e Estado de todos os componentes deste modulo

export interface CustomersState {
  customer: fromCustomer.CustomerState
}

export const customersReducers = {
  customer: fromCustomer.customerReducer
}

export const customersEffects = [
  CustomerEffect
]
