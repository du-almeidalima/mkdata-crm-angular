import {createAction, props} from "@ngrx/store";
import {CustomerGroup} from "../../../../shared/models/customer-group";

export enum CustomerGroupActionTypes {
  FetchCustomerGroups = '[Customers Group] Fetch Customer Groups',
  SetCustomerGroups = '[Customers Group] Set Customer Groups',
  CustomerGroupError = '[Customers Group] Customer Group Error',
}

// Customer Group Actions
export const fetchCustomerGroups = createAction(
  CustomerGroupActionTypes.FetchCustomerGroups
);

export const setCustomerGroups = createAction(
  CustomerGroupActionTypes.SetCustomerGroups,
  props<{ payload: CustomerGroup[] }>()
);

export const customerGroupError = createAction(
  CustomerGroupActionTypes.SetCustomerGroups,
  props<{ payload: string }>()
);
