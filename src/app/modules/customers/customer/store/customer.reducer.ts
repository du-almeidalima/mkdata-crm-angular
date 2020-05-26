import {Action, createReducer, on} from "@ngrx/store";
import {Customer} from "../../../../shared/models/customer";
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  current: Customer,
  message: string
}

const initialState: CustomerState = {
  current: null,
  message: null
};

// Auth Reducers
const customerReducerCreator = createReducer(initialState,
  on(CustomerActions.setCustomer, (state, props) => ({ ...state, current: props.payload})),
  on(CustomerActions.deleteCustomer, state => ({})),
  on(CustomerActions.updateCustomer, state => ({})),
  on(CustomerActions.customerError, (state, props) => ({ ...state, message: props.payload})),
);

export function customerReducer(state: CustomerState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
