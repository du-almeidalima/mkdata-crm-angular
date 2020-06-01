import {Action, createReducer, on} from '@ngrx/store';
import {CustomerGroup} from '../../../../shared/models/customer-group';
import * as CustomerGroupActions from './customer-group.actions';

export interface CustomerGroupState {
  customerGroups: CustomerGroup[];
  current: CustomerGroup;
}

const initialState: CustomerGroupState = {
  customerGroups: [],
  current: null
};

// Customer Groups Reducers
const customerReducerCreator = createReducer(initialState,
  on(CustomerGroupActions.setCustomerGroups, (state, props) => ({ ...state, customerGroups: props.payload })),
  on(CustomerGroupActions.setCustomerGroup, (state, props) => ({ ...state, current: props.payload })),
  on(CustomerGroupActions.deleteCustomerGroup, state => ({ ...state, current: null })),
);

export function customerGroupReducer(state: CustomerGroupState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
