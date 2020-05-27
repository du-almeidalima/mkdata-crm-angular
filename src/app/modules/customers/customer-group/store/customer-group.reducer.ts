import {Action, createReducer, on} from "@ngrx/store";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import * as CustomerGroupActions from './customer-group.actions';

export interface CustomerGroupState {
  customerGroups: CustomerGroup[];
  message: string;
}

const initialState: CustomerGroupState = {
  customerGroups: [],
  message: null
};

// Customer Groups Reducers
const customerReducerCreator = createReducer(initialState,
  on(CustomerGroupActions.setCustomerGroups, (state, props) => ({ ...state, customerGroups: props.payload })),
  on(CustomerGroupActions.customerGroupError, (state, props) => ({ ...state, message: props.payload})),
);

export function customerGroupReducer(state: CustomerGroupState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
