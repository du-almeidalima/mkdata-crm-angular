import * as fromCustomer from '../customer/store/customer.reducer.';

// Este Arquivo é a junção dos Reducers e Estado de todos os componentes deste modulo

export interface CustomersState {
  customer: fromCustomer.CustomerState
}

export const customerReducers = {
  customer: fromCustomer.customerReducer
}
