import {Action, createReducer, on} from "@ngrx/store";
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  customer: {}
}

const initialState: CustomerState = {
  customer: null
};

// Auth Reducers
const customerReducerCreator = createReducer(initialState,
  on(CustomerActions.setCustomer, state => ({ ...state})),
  on(CustomerActions.createCustomer, state => ({})),
  on(CustomerActions.deleteCustomer, state => ({})),
  on(CustomerActions.updateCustomer, state => ({})),
);

export function customerReducer(state: CustomerState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
