import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthResponseData} from "./store/auth.effects";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const {email, password} = form.value;
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart(
          {
            email: email,
            password: password
          })
      )
    } else {
      this.store.dispatch(new AuthActions.SignUpStart({email: email, password: password}))
    }

    // authObs.subscribe(resData => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error => {
    //     this.isLoading = false;
    //     this.error = error;
    //   });

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

}
