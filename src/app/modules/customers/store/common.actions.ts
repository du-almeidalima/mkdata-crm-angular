import {createAction, props} from "@ngrx/store";
import {Message} from "../../../shared/message";

export enum CustomersActionTypes {
  SetMessage = '[Customers] Set Message',
  DismissMessage = '[Customers] Dismiss Message'
}

// Customers Actions
export const setMessage = createAction(
  CustomersActionTypes.SetMessage,
  props<{ payload: Message }>()
);

export const dismissMessage = createAction(
  CustomersActionTypes.DismissMessage
);
