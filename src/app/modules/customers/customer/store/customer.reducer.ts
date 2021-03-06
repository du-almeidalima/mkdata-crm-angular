import {Action, createReducer, on} from '@ngrx/store';
import {Customer} from '../../../../shared/models/customer';
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  current: Customer;
}

const initialState: CustomerState = {
  current: null
};

// Customer Reducers
const customerReducerCreator = createReducer(initialState,
  on(CustomerActions.setCustomer, (state, props) => ({ ...state, current: props.payload})),
  on(CustomerActions.deleteCustomer, state => ({ ...state, current: null })),
);

export function customerReducer(state: CustomerState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
