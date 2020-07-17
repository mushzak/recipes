import {Action} from "@ngrx/store";

export const LOGIN_START = "[Auth] Start";
export const LOGIN_FAIL = "[Auth] Fail";
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const SIGN_UP_START = "[Auth] Sign up Start";
export const SIGN_UP_FAIL = "[Auth] Sign up Fail";

export class Login implements Action {
  readonly type = LOGIN;

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

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {
  }
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
