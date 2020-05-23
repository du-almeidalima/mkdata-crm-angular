import {createAction, props} from '@ngrx/store';
import {User} from "../../../shared/models/user";

export enum AuthActionsTypes {
  StartAuthentication = '[Auth] Start Authentication',
  AuthenticationSuccess = '[Auth] Authentication Success',
  AuthenticationFail = '[Auth] Authentication Fail',
  AutoLogin = '[Auth] Auto Login',
  Logout = '[Auth] Logout'
}

// Auth Actions
export const startAuthentication = createAction(AuthActionsTypes.StartAuthentication, props<{ username: string, password: string }>());
export const authenticationSuccess = createAction(AuthActionsTypes.AuthenticationSuccess, props<{ user: User, redirect: boolean }>());
export const authenticationFail = createAction(AuthActionsTypes.AuthenticationFail, props<{ message: string }>());
export const autoLogin = createAction(AuthActionsTypes.AutoLogin);
export const logout = createAction(AuthActionsTypes.Logout);
