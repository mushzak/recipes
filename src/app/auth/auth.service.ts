import {Injectable} from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTime: any;

  constructor(private store: Store<fromApp.AppState>) {
  }
  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
      }, expirationDuration);
  }

  clearLogoutTimer(){
    if (this.tokenExpirationTime){
      clearTimeout(this.tokenExpirationTime);
      this.tokenExpirationTime = null;
    }
  }
}
