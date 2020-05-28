import {createAction, props} from "@ngrx/store";
import {Customer} from "../../../../shared/models/customer";
import {Message} from "../../../../shared/message";

export enum CustomerActionTypes {
  FetchCustomer = '[Customers] Fetch Customer',
  SetCustomer = '[Customers] Set Customer',
  CreateCustomer = '[Customers] Create Customer',
  DeleteCustomer = '[Customers] Delete Customer',
  UpdateCustomer = '[Customers] Update Customer',
  CustomerError = '[Customers] Customer Error',
  DismissMessage = '[Customers] Dismiss Message'
}

// Customer Actions
export const fetchCustomer = createAction(
  CustomerActionTypes.FetchCustomer,
  props<{ payload: number }>()
);

export const setCustomer = createAction(
  CustomerActionTypes.SetCustomer,
  props<{ payload: Customer }>()
);

export const createCustomer = createAction(
  CustomerActionTypes.CreateCustomer,
  props<{ payload: Customer }>()
);

export const deleteCustomer = createAction(
  CustomerActionTypes.DeleteCustomer,
  props<{ }>()
);

export const updateCustomer = createAction(
  CustomerActionTypes.UpdateCustomer
);

export const customerError = createAction(
  CustomerActionTypes.CustomerError,
  props<{ payload: Message }>()
);

export const dismissMessage = createAction(
  CustomerActionTypes.DismissMessage
);
