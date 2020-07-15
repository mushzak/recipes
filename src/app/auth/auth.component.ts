import {Component, Inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    const {email, password} = form.value;
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        this.isLoading = false;
        this.error = error;
      });
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

}
