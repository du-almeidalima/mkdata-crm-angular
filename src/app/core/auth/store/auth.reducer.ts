import {Action, createReducer, on} from "@ngrx/store";
import {User} from "../../../shared/models/user";
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User,
  feedbackMessage: string,
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  feedbackMessage: null,
  isLoading: false
};

// Auth Reducers
const authReducerCreator = createReducer(initialState,
  on(AuthActions.startAuthentication, state => ({ ...state, isLoading: true })),
  on(AuthActions.authenticationSuccess, (state, props)=> ({
    ...state,
    user: props.user,
    isLoading: false })
  ),
  on(AuthActions.authenticationFail, (state, props) => ({
    ...state,
    feedbackMessage: props.message,
    isLoading: false })
  )
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerCreator(state, action);
}
