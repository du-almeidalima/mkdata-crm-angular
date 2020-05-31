import {Action, createReducer, on} from "@ngrx/store";
import {Customer} from "../../../../shared/models/customer";
import {Message} from "../../../../shared/message";
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  current: Customer,
  message: Message
}

const initialState: CustomerState = {
  current: null,
  message: null
};

// Customer Reducers
const customerReducerCreator = createReducer(initialState,
  on(CustomerActions.setCustomer, (state, props) => ({ ...state, current: props.payload, message: null})),
);

export function customerReducer(state: CustomerState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
