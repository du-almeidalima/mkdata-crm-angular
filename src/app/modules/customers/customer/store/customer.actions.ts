import {createAction, props} from "@ngrx/store";
import {Customer} from "../../../../shared/models/customer";

export enum CustomerActionTypes {
  FetchCustomer = '[Customer] Fetch Customer',
  SetCustomer = '[Customer] Set Customer',
  CreateCustomer = '[Customer] Create Customer',
  DeleteCustomer = '[Customer] Delete Customer',
  UpdateCustomer = '[Customer] Update Customer'
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
  CustomerActionTypes.UpdateCustomer,
  props<{ payload: Customer }>()
);
