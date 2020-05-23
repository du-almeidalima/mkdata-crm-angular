import {createAction, props} from '@ngrx/store';
import {User} from "../../../shared/models/user";

export const START_AUTHENTICATION = '[Auth] Start Authentication';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAIL = '[Auth] Authentication Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

// Auth Actions
export const startAuthentication = createAction(START_AUTHENTICATION, props<{ username: string, password: string }>());
export const authenticationSuccess = createAction(AUTHENTICATION_SUCCESS, props<{ user: User, redirect: boolean }>());
export const authenticationFail = createAction(AUTHENTICATION_FAIL, props<{ message: string }>());
export const autoLogin = createAction(AUTO_LOGIN);
export const logout = createAction(LOGOUT);
