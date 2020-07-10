import {Component, Inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {tokenReference} from "@angular/compiler";

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.isLoading = false;
    } else {
      const {email, password} = form.value;
      this.authService.signUp(email, password).subscribe(resData => {
          this.isLoading = false;
          console.log(resData);
        },
        error => {
          this.isLoading = false;
          console.log(error);
        });
      form.reset();
    }

  }
}
