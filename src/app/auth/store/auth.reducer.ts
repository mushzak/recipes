import {UserModel} from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: UserModel;
}

const initialState: State = {
  user: null
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case "LOGIN":
      const user = new UserModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate,
      );
      return {
        ...state,
        user: user
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }

}
