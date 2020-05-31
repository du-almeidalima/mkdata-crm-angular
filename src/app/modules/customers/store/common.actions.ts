import {createAction, props} from "@ngrx/store";
import {Message} from "../../../shared/message";

export enum CustomerCommonActionTypes {
  SetMessage = '[Customer Common] Set Message',
  DismissMessage = '[Customer Common] Dismiss Message'
}

// Customers Actions
export const setMessage = createAction(
  CustomerCommonActionTypes.SetMessage,
  props<{ payload: Message }>()
);

export const dismissMessage = createAction(
  CustomerCommonActionTypes.DismissMessage
);
