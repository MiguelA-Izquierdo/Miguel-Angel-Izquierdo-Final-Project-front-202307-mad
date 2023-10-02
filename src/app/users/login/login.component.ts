import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RepoUsersService } from "src/app/services/repo.users.service/repo.users.service";
import { StoreService } from "src/app/services/store/store.service";
import { LoginData } from "src/app/types/user";

@Component({
  selector: "trips-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  newLoginForm: FormGroup;
  loginState: "logout" | "login" | "loading" | "error";

  constructor(
    public formBuilder: FormBuilder,
    private repoUsers: RepoUsersService,
    private router: Router,
    private storeService: StoreService
  ) {
    this.newLoginForm = formBuilder.group({
      userName: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });

    this.loginState = "logout";
  }

  handleSubmit() {
    const loginUser: LoginData = this.newLoginForm.value;
    this.loginState = "loading";
    if (this.newLoginForm.valid) {
      this.repoUsers.login(loginUser).subscribe({
        next: (data) => {
          this.storeService.setCurrentUser(data);
          this.loginState = "login";
          this.router.navigateByUrl("/home");
          this.storeService.setCurrentUser(data);
        },
        error: () => (this.loginState = "error"),
      });
    }
  }

  handleBack() {
    this.loginState = "logout";
  }
}
