import {createAction, props} from "@ngrx/store";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import {Message} from "../../../../shared/message";

export enum CustomerGroupActionTypes {
  FetchCustomerGroups = '[Customer Group] Fetch Customer Groups',
  FetchCustomerGroup = '[Customer Group] Fetch Customer Group',
  SetCustomerGroups = '[Customer Group] Set Customer Groups',
  SetCustomerGroup = '[Customer Group] Set Customer Group',
  CreateCustomerGroup = '[Customer Group] Create Customer Group',
  DeleteCustomerGroup = '[Customer Group] Delete Customer Group',
  UpdateCustomerGroup = '[Customer Group] Update Customer Group',
  CustomerGroupError = '[Customer Group] Customer Group Error',
  DismissMessage = '[Customer Group] Dismiss Message'
}

// Customer Group Actions
export const fetchCustomerGroups = createAction(
  CustomerGroupActionTypes.FetchCustomerGroups
);

export const fetchCustomerGroup = createAction(
  CustomerGroupActionTypes.FetchCustomerGroup,
  props<{ payload: number, redirect: boolean }>()
);

export const setCustomerGroups = createAction(
  CustomerGroupActionTypes.SetCustomerGroups,
  props<{ payload: CustomerGroup[] }>()
);

export const setCustomerGroup = createAction(
  CustomerGroupActionTypes.SetCustomerGroup,
  props<{ payload: CustomerGroup, redirect: boolean }>()
);

export const createCustomerGroup = createAction(
  CustomerGroupActionTypes.CreateCustomerGroup,
  props<{ payload: CustomerGroup }>()
);

export const deleteCustomerGroup = createAction(
  CustomerGroupActionTypes.DeleteCustomerGroup,
  props<{ payload: number }>()
);

export const updateCustomerGroup = createAction(
  CustomerGroupActionTypes.UpdateCustomerGroup,
  props<{ payload: CustomerGroup }>()
);

export const customerGroupError = createAction(
  CustomerGroupActionTypes.CustomerGroupError,
  props<{ payload: Message }>()
);

export const dismissMessage = createAction(
  CustomerGroupActionTypes.DismissMessage
);
