import {createAction, props} from "@ngrx/store";

export enum AuthActionsTypes {
  FetchCustomer = '[Customers] Fetch Customer',
  SetCustomer = '[Customers] Set Customer',
  CreateCustomer = '[Customers] Create Customer',
  DeleteCustomer = '[Customers] Delete Customer',
  UpdateCustomer = '[Customers] Update Customer'
}

// Customer Actions
export const fetchCustomer = createAction(AuthActionsTypes.FetchCustomer, props<{ }>());
export const setCustomer = createAction(AuthActionsTypes.SetCustomer, props<{ }>());
export const createCustomer = createAction(AuthActionsTypes.CreateCustomer, props<{ }>());
export const deleteCustomer = createAction(AuthActionsTypes.DeleteCustomer, props<{ }>());
export const updateCustomer = createAction(AuthActionsTypes.UpdateCustomer);
