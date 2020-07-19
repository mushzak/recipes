import {Action} from "@ngrx/store";

export const LOGIN_START = "[Auth] Start";
export const AUTHENTICATE_SUCCESS = "[Auth] Login";
export const AUTHENTICATE__FAIL = "[Auth] Fail";
export const LOGOUT = "[Auth] Logout";
export const SIGN_UP_START = "[Auth] Sign up Start";
export const SIGN_UP_FAIL = '[Auth] Sign up Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto login';
export const AUTO_LOGOUT = '[Auth] Auto logout';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE__FAIL;

  constructor(public payload: string) {
  }
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string; password: string }) {
  }
}

export class SignUpFail implements Action {
  readonly type = SIGN_UP_START;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignUpStart
  | SignUpFail
  | ClearError
  | AutoLogin;
