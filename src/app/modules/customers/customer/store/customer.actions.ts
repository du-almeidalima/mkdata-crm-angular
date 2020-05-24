import {createAction, props} from "@ngrx/store";

export enum CustomerActionTypes {
  FetchCustomer = '[Customers] Fetch Customer',
  SetCustomer = '[Customers] Set Customer',
  CreateCustomer = '[Customers] Create Customer',
  DeleteCustomer = '[Customers] Delete Customer',
  UpdateCustomer = '[Customers] Update Customer'
}

// Customer Actions
export const fetchCustomer = createAction(CustomerActionTypes.FetchCustomer, props<{ }>());
export const setCustomer = createAction(CustomerActionTypes.SetCustomer, props<{ }>());
export const createCustomer = createAction(CustomerActionTypes.CreateCustomer, props<{ }>());
export const deleteCustomer = createAction(CustomerActionTypes.DeleteCustomer, props<{ }>());
export const updateCustomer = createAction(CustomerActionTypes.UpdateCustomer);
