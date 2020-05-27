import {createAction, props} from "@ngrx/store";
import {Customer} from "../../../../shared/models/customer";

export enum CustomerActionTypes {
  FetchCustomer = '[Customers] Fetch Customer',
  SetCustomer = '[Customers] Set Customer',
  CreateCustomer = '[Customers] Create Customer',
  DeleteCustomer = '[Customers] Delete Customer',
  UpdateCustomer = '[Customers] Update Customer',
  CustomerError = '[Customers] Customer Error'
}

// Customer Actions
export const fetchCustomer = createAction(
  CustomerActionTypes.FetchCustomer,
  props<{ }>()
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
  props<{ payload: string }>()
);
