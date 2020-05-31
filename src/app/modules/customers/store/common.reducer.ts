import {Action, createReducer, on} from "@ngrx/store";
import {Message} from "../../../shared/message";
import * as CommonActions from './common.actions';

export interface CustomersCommonState {
  message: Message
}

const initialState: CustomersCommonState = {
  message: null
};

// Root Reducers
const customerRootReducerCreator = createReducer(initialState,
  on(CommonActions.setMessage, (state, props) => ({ ...state, message: props.payload})),
  on(CommonActions.dismissMessage, state => ({ ...state, message: null}))
);

export function customerReducer(state: CustomersCommonState | undefined, action: Action) {
  return customerRootReducerCreator(state, action);
}
